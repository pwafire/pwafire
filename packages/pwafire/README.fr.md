# PWAFire (APIs d'Applications Web Progressives)

Une bibliothèque moderne et modulaire pour créer facilement des Applications Web Progressives. PWAFire fournit un ensemble complet d'APIs et d'utilitaires pour améliorer vos applications web avec des capacités PWA. Construit sur Project Fugu, PWAFire aide à combler l'écart entre les capacités web et natives.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org)
[![Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

## Fonctionnalités

- Conception d'API moderne et optimisée (tree-shakeable)
- Capacités PWA complètes
- Aucune dépendance
- Support TypeScript
- Support universel des navigateurs
- Options d'importation multiples (ESM, CJS, CDN)
- Convention de nommage camelCase cohérente
- Détection de fonctionnalités intégrée
- Documentation complète
- Couverture de tests étendue

## Démarrage Rapide

### Installation

```bash
# Avec npm
npm install pwafire@latest

# Avec yarn
yarn add pwafire@latest

# Avec pnpm
pnpm add pwafire@latest
```

### Utilisation de Base

```ts
import { copyText } from "pwafire";

const { ok, message } = await copyText("Texte à copier");
```

### Utilisation CDN

```html
<script type="module">
  import { copyText } from "https://unpkg.com/pwafire@latest/lib/index.mjs";

  const result = await copyText("Texte à copier");
</script>
```

### Gestion des Erreurs

```ts
import { copyText } from "pwafire/clipboard";

const handleCopy = async (text: string) => {
  try {
    const { ok, message } = await copyText(text);
  } catch (error) {
    // Gérer l'erreur
  }
};

await handleCopy("Bonjour le monde");
```

## APIs Disponibles

| Fonctionnalité                                          | Stabilité | Description                      | Documentation                                         |
| ------------------------------------------------------- | --------- | -------------------------------- | ----------------------------------------------------- |
| Installation (Personnalisée)                            | ✅        | Installation PWA personnalisée   | [Docs](https://docs.pwafire.org/api/install)          |
| Synchronisation en Arrière-plan                         | ✅        | Synchronisation des données      | [Docs](https://docs.pwafire.org/api/background-sync)  |
| Badges                                                  | ✅        | Gestion des badges d'application | [Docs](https://docs.pwafire.org/api/badging)          |
| Sélecteur de Contacts                                   | ✅        | Sélection de contacts            | [Docs](https://docs.pwafire.org/api/contacts)         |
| Verrouillage d'Écran                                    | ✅        | Empêcher l'écran de s'éteindre   | [Docs](https://docs.pwafire.org/api/wake-lock)        |
| Indexation de Contenu                                   | ✅        | Indexation de recherche          | [Docs](https://docs.pwafire.org/api/content-indexing) |
| Presse-papiers                                          | ✅        | Copier/lire texte et fichiers    | [Docs](https://docs.pwafire.org/api/clipboard)        |
| Notifications Push                                      | ✅        | Notifications web push           | [Docs](https://docs.pwafire.org/api/notifications)    |
| Partage Web                                             | ✅        | Partage natif                    | [Docs](https://docs.pwafire.org/api/web-share)        |
| Paiements Web                                           | ✅        | Traitement des paiements         | [Docs](https://docs.pwafire.org/api/payment)          |
| Visibilité                                              | ✅        | Détection de visibilité          | [Docs](https://docs.pwafire.org/api/visibility)       |
| Chargement Différé                                      | ✅        | Chargement différé d'images      | [Docs](https://docs.pwafire.org/api/lazy-load)        |
| [Voir Tout (14+)](https://docs.pwafire.org/get-started) | ✅        | Liste complète des APIs          | [Docs](https://docs.pwafire.org/api)                  |

## Détection de Fonctionnalités

```ts
import { check } from "pwafire";

const checkFeatures = async () => {
  const [isShareSupported, isClipboardSupported] = await Promise.all([check.webShare(), check.clipboard()]);
};

await checkFeatures();
```

## Support des Navigateurs

Toutes les APIs sont stables dans :

- Chrome 80+
- Microsoft Edge
- Firefox
- Safari

Consultez [Support des Navigateurs](https://pwafire.org/developer/tools/browser-test/) pour des informations détaillées sur la compatibilité.

## Tests

```bash
# Exécuter les tests
npm test

# Exécuter les tests avec couverture
npm run test:coverage
```

## Contribution

Nous accueillons les contributions ! Veuillez lire notre [Guide de Contribution](CONTRIBUTING.md) pour commencer.

### Configuration du Développement

```bash
# Cloner le dépôt
git clone https://github.com/pwafire/pwafire.git

# Installer les dépendances
npm install

# Démarrer le développement
npm run dev
```

### Comment Contribuer

1. Forker le dépôt
2. Créer votre branche de fonctionnalité (`git checkout -b feature/feature-incroyable`)
3. Commiter vos changements (`git commit -m 'Ajouter une fonctionnalité incroyable'`)
4. Pousser vers la branche (`git push origin feature/feature-incroyable`)
5. Ouvrir une Pull Request

## Licence

MIT © [PWAFire](https://github.com/pwafire)

## Documentation

Pour une documentation détaillée et des exemples, visitez [docs.pwafire.org](https://docs.pwafire.org).

## Communauté

- [Twitter](https://twitter.com/pwafire) - Suivez-nous pour les mises à jour et annonces

## Problèmes

Vous avez trouvé un bug ? Veuillez [créer un problème](https://github.com/pwafire/pwafire/issues/new) pour nous aider à nous améliorer !

## Projets Associés

- [PWA VS Code](https://marketplace.visualstudio.com/items?itemName=mayeedwin.vscode-pwa) - Extensions de Code pour Applications Web Progressives (Incluant le Support Workbox)
