# PWAFire 🔥

Une bibliothèque moderne et modulaire pour créer des Progressive Web Apps avec facilité. PWAFire fournit un ensemble complet d'APIs et d'utilitaires pour améliorer vos applications web avec des capacités PWA.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org)
[![Téléchargements](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

## ✨ Fonctionnalités

- 🔥 API moderne et optimisable (tree-shakeable)
- 📱 Capacités PWA complètes
- 🚀 Aucune dépendance
- ⚡️ Support TypeScript
- 🌐 Support universel des navigateurs
- 📦 Options d'importation multiples (ESM, CJS, CDN)
- 🎯 Convention de nommage camelCase cohérente
- 🔄 Détection de fonctionnalités intégrée

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

### Utilisation

#### Importation Moderne (Recommandée)

```js
// Importations directes pour une meilleure optimisation
import { visibility } from "pwafire";

// Importation directe avec chemin
import { visibility } from "pwafire/visibility";

// Utilisation des APIs
const state = await visibility();
```

#### Importation par Espace de Noms (Support Hérité)

```js
import { pwa } from "pwafire";

// Utilisation de l'espace de noms
pwa.visibility();
pwa.lazyLoad.loadOnScroll();
pwa.install();
pwa.clipboard.copyText();
```

#### Fonctions Autonomes

```js
// API Contacts
import { contacts } from "pwafire";
const result = await contacts(["name", "email"], { multiple: true });

// API Détection d'Inactivité
import { idleDetection } from "pwafire";
const result = await idleDetection(
  "start",
  () => {
    console.log("L'utilisateur est inactif");
  },
  120000,
);
```

#### Utilisation via CDN

```html
<script type="module">
  import { pwa } from "https://unpkg.com/pwafire@latest/esm/index.js";

  // Utilisation de l'API
  pwa.visibility();
</script>
```

## 📚 Référence API

Toutes les APIs retournent un objet de réponse standardisé :

```typescript
interface APIResponse<T = any> {
  ok: boolean;
  message: string;
  data?: T;
}
```

### Exemple d'Utilisation

```js
import { copyText } from "pwafire/clipboard";

try {
  const result = await copyText("Bonjour le monde");

  if (result.ok) {
    console.log("Succès :", result.message);
  } else {
    console.error("Erreur :", result.message);
  }
} catch (error) {
  console.error("Erreur inattendue :", error);
}
```

## 🛠 APIs Disponibles

| Fonctionnalité                                          | Stabilité | Description                      |
| ------------------------------------------------------- | --------- | -------------------------------- |
| Installation (Personnalisée)                            | ✅        | Installation PWA personnalisée   |
| Synchronisation en Arrière-plan                         | ✅        | Synchronisation des données      |
| Badges                                                  | ✅        | Gestion des badges d'application |
| Sélecteur de Contacts                                   | ✅        | Sélection de contacts            |
| Verrouillage d'Écran                                    | ✅        | Empêcher l'écran de s'éteindre   |
| Indexation de Contenu                                   | ✅        | Indexation de recherche          |
| Presse-papiers                                          | ✅        | Copier/lire texte et fichiers    |
| Notifications Push                                      | ✅        | Notifications web push           |
| Partage Web                                             | ✅        | Partage natif                    |
| Paiements Web                                           | ✅        | Traitement des paiements         |
| Visibilité                                              | ✅        | Détection de visibilité          |
| Chargement Différé                                      | ✅        | Chargement d'images différé      |
| [Voir Tout (14+)](https://docs.pwafire.org/get-started) | ✅        | Liste complète des APIs          |

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

Consultez le [Support des Navigateurs](https://pwafire.org/developer/tools/browser-test/) pour des informations détaillées sur la compatibilité.

## 🤝 Contribution

Nous accueillons les contributions ! Veuillez lire notre [Guide de Contribution](CONTRIBUTING.md) pour commencer.

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

- [Twitter](https://twitter.com/pwafire)
- [Discussions GitHub](https://github.com/pwafire/pwafire/discussions)
- [Espace de Travail Slack](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI)

## 🐛 Problèmes

Vous avez trouvé un bug ? Veuillez [créer un ticket](https://github.com/pwafire/pwafire/issues/new) pour nous aider à nous améliorer !
