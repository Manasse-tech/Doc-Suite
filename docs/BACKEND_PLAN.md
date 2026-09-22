# DocSuite Backend Plan

## Objectif

Fournir une API commune au frontend React/Vite, a l'application Android Capacitor et aux futurs clients iOS. Le backend ne doit jamais exposer les credentials de stockage, de paiement ou de modeles IA au client.

## Architecture cible

- API: Node.js + TypeScript, NestJS ou Fastify.
- Base relationnelle: PostgreSQL avec migrations versionnees.
- Stockage binaire: S3 compatible, avec URLs presignees courtes.
- Queue: Redis + BullMQ pour OCR, conversions, indexation et IA.
- Temps reel: SSE pour la progression des jobs; WebSocket seulement si la synchronisation bidirectionnelle l'exige.
- Auth: access token court + refresh token rotatif, hash des mots de passe avec Argon2id.
- Recherche: PostgreSQL full-text au debut, moteur vectoriel ensuite.
- Observabilite: logs JSON, traces des jobs, erreurs anonymisees, metriques de latence et quota.

## Domaines et tables

### users

`id`, `email`, `password_hash`, `display_name`, `avatar_url`, `plan`, `storage_limit_bytes`, `traffic_limit_bytes`, `created_at`, `updated_at`, `deleted_at`.

### sessions

`id`, `user_id`, `refresh_token_hash`, `device_id`, `expires_at`, `revoked_at`, `created_at`.

### documents

`id`, `owner_id`, `name`, `kind`, `mime_type`, `size_bytes`, `page_count`, `storage_key`, `checksum`, `favorite`, `last_opened_at`, `created_at`, `updated_at`, `deleted_at`.

### document_versions

`id`, `document_id`, `version`, `storage_key`, `size_bytes`, `checksum`, `created_by`, `created_at`.

### document_permissions

`id`, `document_id`, `user_id`, `role`, `created_at`, `revoked_at`.

Roles: `owner`, `editor`, `commenter`, `viewer`.

### share_links

`id`, `document_id`, `token_hash`, `role`, `expires_at`, `created_by`, `revoked_at`, `created_at`.

### processing_jobs

`id`, `user_id`, `document_id`, `type`, `status`, `progress`, `input_key`, `output_key`, `error_code`, `started_at`, `finished_at`.

Types: `ocr`, `scan-to-pdf`, `merge`, `split`, `convert`, `protect`, `ai-summary`, `index`.

### usage_events

`id`, `user_id`, `kind`, `bytes`, `metadata`, `created_at`.

## API v1

### Authentification

- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `POST /v1/auth/forgot-password`
- `POST /v1/auth/reset-password`
- `GET /v1/me`
- `PATCH /v1/me`

### Documents

- `GET /v1/documents?kind=&favorite=&cursor=&query=`
- `POST /v1/documents/upload-intent`
- `POST /v1/documents/complete-upload`
- `GET /v1/documents/:id`
- `PATCH /v1/documents/:id`
- `DELETE /v1/documents/:id`
- `POST /v1/documents/:id/restore`
- `POST /v1/documents/:id/favorite`
- `POST /v1/documents/:id/opened`
- `GET /v1/documents/:id/download-url`
- `GET /v1/documents/:id/versions`

### Scanner et traitements

- `POST /v1/scans/upload-intent`
- `POST /v1/scans/complete`
- `POST /v1/documents/:id/jobs`
- `GET /v1/jobs/:id`
- `GET /v1/jobs/:id/events` (SSE)
- `POST /v1/jobs/:id/cancel`

Le client envoie les pages, le serveur valide les types et tailles, crée un job idempotent, puis publie la progression. Un job ne doit jamais bloquer la requete HTTP.

### Partage

- `POST /v1/documents/:id/shares`
- `GET /v1/documents/:id/shares`
- `DELETE /v1/shares/:id`
- `GET /v1/share-links/:token`
- `POST /v1/share-links/:token/access`

### Synchronisation

- `GET /v1/sync/changes?cursor=`
- `POST /v1/sync/ack`
- `POST /v1/sync/conflicts/:id/resolve`

Chaque mutation porte un `request_id`, un `client_mutation_id` et une version de document. Le serveur refuse silencieusement les doublons deja traites et retourne un conflit explicite si la version distante est plus recente.

### Paiement et quotas

- `GET /v1/billing/plans`
- `POST /v1/billing/checkout`
- `POST /v1/billing/customer-portal`
- `POST /v1/webhooks/billing`
- `GET /v1/usage`

Pour Android, les abonnements doivent passer par Google Play Billing. Le backend valide les achats et maintient l'etat d'abonnement cote serveur. Stripe peut servir au web, mais ne doit pas remplacer la validation Google Play pour les achats in-app Android.

## Flux d'upload

1. Le client demande un `upload-intent` avec nom, MIME et taille.
2. L'API verifie l'utilisateur, le quota et les limites.
3. L'API retourne une URL presignee et un identifiant temporaire.
4. Le client envoie le binaire directement au stockage.
5. Le client appelle `complete-upload` avec checksum.
6. Le serveur confirme le checksum, cree le document et publie l'indexation.
7. Le frontend rafraichit la liste et suit le job eventuel.

## Securite

- Validation stricte MIME, extension, taille et checksum.
- Antivirus avant mise a disposition.
- URLs presignees a duree courte.
- Autorisation par document sur chaque endpoint.
- Rate limiting par utilisateur et adresse IP.
- Protection CSRF si cookies; CORS limite aux origines connues.
- Aucun token ou secret dans le bundle React ou l'APK.
- Chiffrement en transit et au repos.
- Journal d'audit pour partage, suppression, telechargement et permissions.
- Suppression RGPD: suppression logique, fenetre de restauration, puis purge du stockage et des index.

## Jobs lourds

- `scan-to-pdf`: assemblage et normalisation des pages.
- `ocr`: extraction de texte et confiance par page.
- `convert`: conversion isolee dans un worker limite en CPU/memoire.
- `merge/split`: verification des pages et production d'une nouvelle version.
- `ai-summary`: extraction, filtrage des donnees sensibles, appel fournisseur, stockage du resultat avec expiration.
- `index`: texte, metadata et embeddings si la recherche semantique est activee.

Chaque worker doit etre idempotent, retryable avec backoff, cancellable et nettoyer ses fichiers temporaires.

## Contrat frontend a introduire

- Remplacer `localStorage`/IndexedDB par un repository `DocumentRepository`.
- Garder les composants independants de la source de donnees.
- Exposer `loading`, `error`, `refresh`, `retry` et `mutate` dans les hooks.
- Ajouter un cache local offline et une file de mutations a synchroniser.
- Ne jamais faire dependre l'UI d'un format de reponse non versionne.

## Deploiement

1. Environnements local, preview et production separes.
2. Migrations PostgreSQL executees dans la CI avant le serveur.
3. Secrets dans le gestionnaire de secrets de l'hebergeur.
4. API et workers deployes separement mais avec la meme version de schema.
5. Stockage avec lifecycle rules et sauvegardes.
6. Health checks `/health/live` et `/health/ready`.
7. CI: typecheck, tests unitaires, tests API, tests E2E, scan dependances, scan secrets.
8. Deploiement progressif et rollback de l'API.

## Ordre de livraison

### Phase 1: fondations

Auth, PostgreSQL, documents metadata, upload/download securise, quotas et OpenAPI.

### Phase 2: experience connectee

Remplacement du repository local, favoris, recents, suppression/restauration, multi-appareils et conflits.

### Phase 3: traitements

Scanner, OCR, PDF, conversions, progression SSE et antivirus.

### Phase 4: partage et monétisation

Permissions, liens, audit, plans, Google Play Billing, webhooks et limites.

### Phase 5: IA et production

Resume, recherche plein texte/vectorielle, monitoring, sauvegardes, RGPD et durcissement securite.
