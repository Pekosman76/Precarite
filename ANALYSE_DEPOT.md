# Analyse de structure et modèle de liens internes (GitHub Pages)

- `index.html` et les pages éditoriales (`guide-prime-precarite.html`, `exceptions-prime-precarite.html`, `solde-de-tout-compte.html`) sont au **même niveau** (racine du repo).
- Pour rester compatible avec un déploiement GitHub Pages en racine de domaine **et** sous-sous-chemin (`pseudo.github.io/repo/`), les liens internes doivent être écrits en **relatif**.

## Modèle recommandé

- Pages au même niveau : `./nom-de-page.html`
- Ressources statiques au même niveau : `./favicon.ico`, `./site.webmanifest`, etc.
- Éviter `href="/..."` pour les pages internes (cela force la racine du domaine et peut casser en sous-chemin).
