# PWAFire

Modern PWA APIs for building Progressive Web Apps with ease.

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

## Quick Start

```typescript
import { copyText } from "pwafire";

const { ok, message } = await copyText("Hello World");
```

## Tree-shaking

Named and deep imports tree-shake automatically with any modern bundler:

```ts
import { copyText } from "pwafire";                              // npm, named
import { copyText } from "pwafire/clipboard";                    // npm, deep import
import { copyText } from "https://esm.sh/pwafire@6/clipboard";   // CDN
```

The namespace form below stays supported but pulls the full API surface:

```ts
import { pwa } from "pwafire";
pwa.copyText("Hello World");
```

## CDN Usage

Drop pwafire into any page without a build step. **esm.sh** is the recommended entry — it respects the package's `exports` field and rewrites bare specifiers so deep imports work the same as in npm:

```html
<script type="module">
  import { copyText } from "https://esm.sh/pwafire@6/clipboard";
  await copyText("hello from the CDN");
</script>
```

**unpkg** and **jsDelivr** serve the tarball verbatim. They don't resolve the `exports` field, so you address files by path:

```html
<script type="module">
  import { copyText } from "https://unpkg.com/pwafire@6/lib/pwa/clipboard/index.mjs";
</script>

<script type="module">
  import { copyText } from "https://cdn.jsdelivr.net/npm/pwafire@6/lib/pwa/clipboard/index.mjs";
</script>
```

**Import maps** keep your in-browser code identical to your npm code:

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
  await copyText("hello");
</script>
```

Pin to an exact version (`pwafire@6.4.4`) for production; `pwafire@6` follows the latest 6.x.

## Try it Live

| Resource                                                             | Description                           |
| -------------------------------------------------------------------- | ------------------------------------- |
| [Launch Console](https://console.pwafire.org)                        | Test all PWA APIs in your browser     |
| [Code Live](https://stackblitz.com/edit/pwafire?file=src%2Findex.ts) | Live Demo & Playground — edit and run |

## Documentation

| Document                                              | Description                         |
| ----------------------------------------------------- | ----------------------------------- |
| [Documentation](https://docs.pwafire.org/get-started) | API reference, guides, and examples |
| [Breaking Changes](./docs/agents/breaking-changes.md) | Migration guide for v6.0.0          |
| [Contributing](./.github/CONTRIBUTING.md)             | Contribution guidelines             |
| [Code of Conduct](./.github/CODE_OF_CONDUCT.md)       | Community standards                 |
| [Security](./.github/SECURITY.md)                     | Security policy                     |

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for guidelines.

## License

MIT © [PWAFire](https://github.com/pwafire)
