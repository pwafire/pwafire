# PWAFire

APIs PWA modernes pour créer des Applications Web Progressives avec facilité.

[![CI](https://github.com/pwafire/pwafire/workflows/CI/badge.svg)](https://github.com/pwafire/pwafire/actions/workflows/pwafire-ci.yml)
[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![npm downloads](https://img.shields.io/npm/dm/pwafire.svg)](https://www.npmjs.com/package/pwafire)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/pwafire?label=minzip)](https://bundlephobia.com/package/pwafire)
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

## Pourquoi pwafire

- **Erreurs typées alignées sur la spec.** Chaque API renvoie `{ ok, message, code, cause }` où `code` est un littéral `ErrorCode` en kebab-case (`"unsupported"`, `"permission-denied"`, `"gesture-required"`, …) — branchez dessus plutôt que de filtrer `message` par chaîne. L'erreur d'origine est conservée dans `cause`.
- **Détection de capacité structurée.** `pwafire/capability` retourne `{ supported, reason, secureContext, requiresUserActivation }` par API pour faire de l'enrichissement progressif avec des diagnostics actionnables. `pwafire/check` reste booléen pur.
- **Tree-shakeable.** Imports profonds + `sideEffects: false` — vous payez uniquement ce que vous utilisez.
- **Strictement rétro-compatible.** v6.5 est purement additif : chaque champ existant de chaque résultat est préservé. Les APIs qui exposaient déjà `status` (notification, summarizer, translator, language-detector) le conservent à côté du nouveau `code`, avec une note de suppression en v7.

```ts
import { copyText } from "pwafire/clipboard";
import { clipboard } from "pwafire/capability";

const cap = clipboard();
if (!cap.supported) {
  if (cap.reason === "insecure-context") return afficherBanniereHttps();
  if (cap.reason === "no-user-activation") return activerSurClic();
  return cacherBoutonCopier();
}

const r = await copyText("salut");
if (!r.ok && r.code === "permission-denied") demanderAutorisation();
```

## Compatibilité navigateurs

`ctx sécurisé` et `geste utilisateur` sont des exigences statiques de l'API. Les versions disponibles par navigateur vivent dans les liens — ils sont à jour au fil des releases.

| API | ctx sécurisé | geste utilisateur | Référence |
| --- | :-: | :-: | --- |
| `badging` | ✅ | — | [Badging API](https://caniuse.com/mdn-api_navigator_setappbadge) |
| `barcode` | — | — | [BarcodeDetector](https://caniuse.com/mdn-api_barcodedetector) |
| `broadcast` | — | — | [BroadcastChannel](https://caniuse.com/broadcastchannel) |
| `clipboard` | ✅ | ✅ | [Async Clipboard](https://caniuse.com/async-clipboard) |
| `compression` | — | — | [CompressionStream](https://caniuse.com/mdn-api_compressionstream) |
| `connectivity` | — | — | [navigator.onLine](https://caniuse.com/online-status) |
| `contacts` | ✅ | ✅ | [Contact Picker](https://caniuse.com/mdn-api_contactsmanager) |
| `content-indexing` | ✅ | — | [Content Index](https://caniuse.com/mdn-api_contentindex) |
| `files` | ✅ | ✅ | [File System Access](https://caniuse.com/native-filesystem-api) |
| `fonts` | ✅ | ✅ | [Local Font Access](https://caniuse.com/mdn-api_window_querylocalfonts) |
| `fullscreen` | — | ✅ | [Fullscreen](https://caniuse.com/fullscreen) |
| `idle-detection` | ✅ | ✅ | [IdleDetector](https://caniuse.com/mdn-api_idledetector) |
| `install` | ✅ | ✅ | [web.dev install](https://web.dev/customize-install/) |
| `language-detector` | ✅ | ✅ | [Chrome AI : Détection de langue](https://developer.chrome.com/docs/ai/language-detection) |
| `lazy-load` | — | — | [loading=lazy](https://caniuse.com/loading-lazy-attr) |
| `notification` | ✅ | ✅ | [Notifications](https://caniuse.com/notifications) |
| `passkey` | ✅ | ✅ | [WebAuthn](https://caniuse.com/webauthn) |
| `payment` | ✅ | ✅ | [Payment Request](https://caniuse.com/payment-request) |
| `screen` | ✅ | ✅ | [getDisplayMedia](https://caniuse.com/mdn-api_mediadevices_getdisplaymedia) |
| `summarizer` | ✅ | ✅ | [Chrome AI : Summarizer](https://developer.chrome.com/docs/ai/summarizer-api) |
| `translator` | ✅ | ✅ | [Chrome AI : Translator](https://developer.chrome.com/docs/ai/translator-api) |
| `visibility` | — | — | [Page Visibility](https://caniuse.com/pagevisibility) |
| `wake-lock` | ✅ | — | [Screen Wake Lock](https://caniuse.com/wake-lock) |
| `web-otp` | ✅ | ✅ | [Web OTP](https://caniuse.com/webotp) |
| `web-share` | ✅ | ✅ | [Web Share](https://caniuse.com/web-share) |

## Tree-shaking

Les imports nommés et profonds sont tree-shakés automatiquement par tout bundler moderne :

```ts
import { copyText } from "pwafire";                              // npm, nommé
import { copyText } from "pwafire/clipboard";                    // npm, import profond
import { copyText } from "https://esm.sh/pwafire@6/clipboard";   // CDN
```

La forme par namespace ci-dessous reste prise en charge mais importe l'intégralité de l'API :

```ts
import { pwa } from "pwafire";
pwa.copyText("Bonjour le monde");
```

## Utilisation via CDN

Intégrez pwafire à n'importe quelle page sans étape de build. **esm.sh** est l'entrée recommandée — il respecte le champ `exports` du package et réécrit les spécificateurs bare, donc les imports profonds fonctionnent comme via npm :

```html
<script type="module">
  import { copyText } from "https://esm.sh/pwafire@6/clipboard";
  await copyText("bonjour depuis le CDN");
</script>
```

**unpkg** et **jsDelivr** servent l'archive telle quelle. Ils n'évaluent pas le champ `exports`, donc on adresse les fichiers par chemin :

```html
<script type="module">
  import { copyText } from "https://unpkg.com/pwafire@6/lib/pwa/clipboard/index.mjs";
</script>

<script type="module">
  import { copyText } from "https://cdn.jsdelivr.net/npm/pwafire@6/lib/pwa/clipboard/index.mjs";
</script>
```

Les **import maps** permettent de garder le même code que côté npm :

```html
<script type="importmap">
  {
    "imports": {
      "pwafire": "https://esm.sh/pwafire@6",
      "pwafire/": "https://esm.sh/pwafire@6/"
    }
  }
</script>

<script type="module">
  import { copyText } from "pwafire/clipboard";
  await copyText("bonjour");
</script>
```

Épinglez une version précise (`pwafire@6.4.4`) en production ; `pwafire@6` suit la dernière 6.x.

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
