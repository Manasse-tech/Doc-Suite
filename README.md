# DocSuite — App de gestion de documents (reconstruction originale)

Reconstruction React + TypeScript + Tailwind CSS d'une application mobile de
gestion de documents (PDF / Word / Tableur / Diapos) avec scanner, signature
électronique et boîte à outils, inspirée de l'expérience utilisateur observée
dans une vidéo de démonstration.

**Aucun logo, nom, texte ou icône du produit original n'a été repris.**
L'identité visuelle (nom "DocSuite", palette de couleurs, typographies,
iconographie, copy) a été entièrement recréée.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut http://localhost:5173).

## Build de production

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/     Composants réutilisables (TopBar, FileRow, BottomNav, BottomSheet...)
  screens/        Un composant par écran de l'app (Splash, Today, Library, Tools...)
  data/           Données de démonstration (fichiers mock)
  types/          Types TypeScript partagés
  App.tsx         Machine à états qui enchaîne les écrans (navigation simulée)
```

## Écrans inclus

1. **Splash** — écran de lancement animé
2. **Today** — date du jour + statistiques de documents (2×2)
3. **Library** — gestionnaire de fichiers (onglets PDF/Word/Tableur/Diapos, recherche,
   favoris, récents, bouton scanner flottant)
4. **File action sheet** — menu contextuel (détails, renommer, mot de passe, partager…)
5. **Tools** — boîte à outils (Modifier / Convertir / Gérer)
6. **Signature** — pose de signature sur document avec zone déplaçable
7. **Scanner** — caméra avec détection automatique de bords
8. **Scan review** — retouche (amélioration, filtres, recadrage) avant enregistrement
9. **Account** — abonnement, quotas de stockage cloud
10. **Sync** — état de synchronisation
11. **Slide / Sheet viewers** — visionneuses plein écran

## Notes techniques

- Tailwind CSS avec palette de tokens personnalisée (`iris`, `rose`, `azure`, `moss`,
  `amber`, `ink`, `paper`) définie dans `tailwind.config.js`
- Police d'affichage **Fraunces**, texte courant **Inter**, chiffres **IBM Plex Mono**
  (chargées via Google Fonts dans `index.html`)
- Icônes via `lucide-react` (bibliothèque libre, aucune icône propriétaire)
- `prefers-reduced-motion` respecté (animations désactivées automatiquement)
- Le composant `PhoneShell` simule un cadre de téléphone pour la démo ; à retirer
  pour une intégration en PWA/app réelle plein écran.
