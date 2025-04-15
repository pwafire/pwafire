# PWAFire (APIs d'Applications Web Progressives)

Une bibliothèque moderne et modulaire pour créer facilement des Applications Web Progressives. PWAFire fournit un ensemble complet d'APIs et d'utilitaires pour améliorer vos applications web avec des capacités PWA. Construit sur Project Fugu, PWAFire aide à combler l'écart entre les capacités web et natives.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org/get-started)
[![Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

Pour la documentation complète et des exemples, visitez [Démarrer avec PWAFire](https://docs.pwafire.org/get-started).

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

### Modes d'Importation

PWAFire prend en charge deux modes d'importation pour une flexibilité et une optimisation optimales :

1. **Importation depuis la racine** (Recommandé pour plusieurs fonctionnalités) :

   ```ts
   import { copyText, webShare } from "pwafire";
   ```

2. **Importation ciblée** (Recommandé pour des fonctionnalités individuelles) :
   ```ts
   import { copyText } from "pwafire/clipboard";
   import { webShare } from "pwafire/web-share";
   ```

Le mode d'importation ciblé est recommandé lorsque vous n'avez besoin que de fonctionnalités spécifiques, car il permet une meilleure optimisation (tree-shaking) et des tailles de bundle plus petites.

### Utilisation de Base

```ts
// Utilisation de l'importation depuis la racine
import { copyText } from "pwafire";

// Utilisation de l'importation ciblée (recommandé pour des fonctionnalités individuelles)
import { copyText } from "pwafire/clipboard";

const { ok, message } = await copyText("Texte à copier");
```

### Utilisation CDN

```html
<script type="module">
  // Utilisation de l'importation depuis la racine
  import { copyText } from "https://unpkg.com/pwafire@latest/lib/index.mjs";

  // Utilisation de l'importation ciblée
  import { copyText } from "https://unpkg.com/pwafire@latest/lib/pwa/clipboard/index.mjs";

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

## Détection de Fonctionnalités

```ts
// Utilisation de l'importation depuis la racine
import { check } from "pwafire";

// Utilisation de l'importation ciblée
import { check } from "pwafire/check";

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

Pour une documentation détaillée et des exemples, visitez [Démarrer avec PWAFire](https://docs.pwafire.org/get-started).

## Communauté

- [Twitter](https://twitter.com/pwafire) - Suivez-nous pour les mises à jour et annonces

## Problèmes

Vous avez trouvé un bug ? Veuillez [créer un problème](https://github.com/pwafire/pwafire/issues/new) pour nous aider à nous améliorer !

## Projets Associés

- [PWA VS Code](https://marketplace.visualstudio.com/items?itemName=mayeedwin.vscode-pwa) - Extensions de Code pour Applications Web Progressives (Incluant le Support Workbox)
- [Playground](https://stackblitz.com/edit/pwafire?file=src%2Findex.ts) - Démo interactive des fonctionnalités de PWAFire
