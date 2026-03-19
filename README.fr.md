# PWAFire

APIs PWA modernes pour créer des Applications Web Progressives avec facilité.

[![CI](https://github.com/pwafire/pwafire/workflows/CI/badge.svg)](https://github.com/pwafire/pwafire/actions/workflows/pwafire-ci.yml)
[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org/get-started)

## Installation

```bash
npm install pwafire
```

## Démarrage Rapide

```typescript
import { copyText } from "pwafire";

const { ok, message } = await copyText("Bonjour le monde");
```

## Essayez en Direct

| Ressource                                                                  | Description                                      |
| -------------------------------------------------------------------------- | ------------------------------------------------ |
| [Lancer la Console](https://console.pwafire.org)                           | Testez toutes les APIs PWA dans votre navigateur |
| [Coder en Direct](https://stackblitz.com/edit/pwafire?file=src%2Findex.ts) | Démo & Playground — modifiez et exécutez         |

## Documentation

| Document                                              | Description                       |
| ----------------------------------------------------- | --------------------------------- |
| [Documentation](https://docs.pwafire.org/get-started) | Référence API, guides et exemples |
| [Breaking Changes](./docs/agents/breaking-changes.md) | Guide de migration pour v6.0.0    |
| [Contributing](./.github/CONTRIBUTING.md)             | Directives de contribution        |
| [Code of Conduct](./.github/CODE_OF_CONDUCT.md)       | Normes communautaires             |
| [Security](./.github/SECURITY.md)                     | Politique de sécurité             |

## Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./.github/CONTRIBUTING.md) pour les directives.

## Licence

MIT © [PWAFire](https://github.com/pwafire)
