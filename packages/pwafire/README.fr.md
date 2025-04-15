# PWAFire 🔥

Une bibliothèque moderne et modulaire pour créer des Progressive Web Apps facilement. PWAFire fournit un ensemble complet d'APIs et d'utilitaires pour améliorer vos applications web avec des capacités PWA. Construit sur Project Fugu, PWAFire aide à combler l'écart entre les capacités web et natives.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org)
[![Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

## ✨ Fonctionnalités

- 🔥 API moderne et optimisable (tree-shakeable)
- 📱 Capacités PWA complètes
- 🚀 Aucune dépendance
- ⚡️ Support TypeScript
- 🌐 Support universel des navigateurs
- 📦 Options d'importation multiples (ESM, CJS, CDN)
- 🎯 Convention de nommage camelCase cohérente
- 🔄 Détection de fonctionnalités intégrée
- 📝 Documentation complète
- 🧪 Couverture de tests étendue

## 🚀 Démarrage Rapide

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

```js
// Import moderne (recommandé)
import { copyText } from "pwafire";

const state = await copyText("Texte à copier");
```

### Utilisation CDN

```html
<script type="module">
  import { copyText } from "https://unpkg.com/pwafire@5.1.8/lib/index.mjs";

  // Use the API
  await copyText("Text to copy");
</script>
```

### Gestion des Erreurs

```js
import { copyText } from "pwafire/clipboard";

try {
  const result = await copyText("Bonjour le monde");

  if (result.ok) {
    console.log("Succès:", result.message);
  } else {
    console.error("Erreur:", result.message);
  }
} catch (error) {
  console.error("Erreur inattendue:", error);
}
```

## 🛠 APIs Disponibles

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

## 🔍 Détection de Fonctionnalités

PWAFire inclut une détection de fonctionnalités intégrée :

```js
import { check } from "pwafire";

// Vérifier si le partage web est supporté
const isShareSupported = await check.webShare();

// Vérifier si l'API Presse-papiers est supportée
const isClipboardSupported = await check.clipboard();
```

## 🌐 Support des Navigateurs

Toutes les APIs sont stables dans :

- Chrome 80+
- Microsoft Edge
- Firefox
- Safari

Consultez [Support des Navigateurs](https://pwafire.org/developer/tools/browser-test/) pour des informations détaillées sur la compatibilité.

## 🧪 Tests

```bash
# Exécuter les tests
npm test

# Exécuter les tests avec couverture
npm run test:coverage
```

## 🤝 Contribution

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

## 📄 Licence

MIT © [PWAFire](https://github.com/pwafire)

## 📖 Documentation

Pour une documentation détaillée et des exemples, visitez [docs.pwafire.org](https://docs.pwafire.org).

## 💬 Communauté

- [Twitter](https://twitter.com/pwafire) - Suivez-nous pour les mises à jour et annonces

## 🐛 Problèmes

Vous avez trouvé un bug ? Veuillez [créer un ticket](https://github.com/pwafire/pwafire/issues/new) pour nous aider à nous améliorer !

## 📦 Projets Associés

- [PWAFire CLI](https://github.com/pwafire/cli) - Outil en ligne de commande pour PWAFire
- [Extension VS Code PWAFire](https://marketplace.visualstudio.com/items?itemName=pwafire.pwafire) - Extension VS Code pour PWAFire
- [Modèles PWAFire](https://github.com/pwafire/templates) - Modèles de démarrage pour PWAFire
