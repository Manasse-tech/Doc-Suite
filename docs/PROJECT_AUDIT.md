# Audit du projet DocSuite

## État actuel

- Framework: React 18 + TypeScript.
- Bundler: Vite 5.
- Styles: Tailwind CSS 3 avec configuration existante, PostCSS et CSS global.
- Icônes: lucide-react.
- Rendu PDF: PDF.js chargé dynamiquement et rendu canvas haute densité.
- Persistance locale: IndexedDB pour les fichiers, localStorage pour thème et récents.
- Tests: Vitest.
- Backend: absent volontairement; les opérations cloud et traitements lourds sont signalés au lieu d'être simulés comme réussis.
- shadcn/ui, Motion, GSAP et Aceternity UI: non introduits dans cette passe pour éviter un changement d'architecture et des dépendances inutilisées.

## Architecture actuelle

`src/App.tsx` orchestre les écrans et l'état global. Les composants partagés sont dans `src/components`, les écrans dans `src/screens`, les données et la persistance dans `src/data`, et les contrats dans `src/types`.

Cette architecture reste adaptée au prototype mobile WebView. Une migration massive vers `pages`, `sections` ou un nouveau design system ne serait pas justifiée avant le backend.

## Corrections vérifiées

- Le mode sombre Compte et Boîte à outils utilise le même état global.
- Le thème est persistant après rechargement.
- Un PDF importé est rendu par PDF.js dans un canvas et non par le lecteur PDF interne de la WebView.
- Le rendu utilise `devicePixelRatio` pour limiter le flou sur écrans haute densité.
- PDF.js est en chunk séparé et chargé uniquement à l'ouverture d'un PDF.
- Les fichiers Word/PowerPoint ne sont plus affichés comme de fausses présentations.
- Les outils sans moteur réel sont désactivés et indiquent leur dépendance backend.
- Les outils réellement actifs sont le scanner, la signature, l'import, l'export, les favoris, le renommage, la suppression et le viewer PDF.

## Risques restants

- Les PDF très lourds peuvent consommer beaucoup de mémoire dans le canvas; il faudra ajouter une stratégie de pagination virtuelle côté mobile.
- Le scanner est encore une capture simulée dans le navigateur; la caméra native arrivera avec Capacitor.
- Les formats Word et PowerPoint nécessitent une conversion serveur ou un moteur natif.
- Le compte Premium est un état local de démonstration et ne doit pas être présenté comme un paiement réel.
- La synchronisation est locale/simulée tant que l'API n'existe pas.

## Ordre recommandé

1. Stabiliser le contrat `DocumentRepository`.
2. Ajouter l'API documents/auth et remplacer IndexedDB par cache offline + synchronisation.
3. Ajouter les workers PDF/OCR/conversion.
4. Ajouter Capacitor et tester Android WebView réelle.
5. Ajouter les outils PDF un par un avec tests d'acceptation.
6. Introduire Motion ou GSAP seulement pour des parcours identifiés par profilage.
7. Ajouter shadcn/ui seulement pour les primitives réellement partagées.
