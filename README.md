# PWAFire - Progressive Web Apps API of APIs

## 🎉 Announcing PWAFire v5.1.7

We're excited to announce the release of PWAFire v5.1.6! This version brings significant improvements to the API structure and developer experience.

### Key Features

1. **Modern API Structure**

   - Direct imports for better tree-shaking
   - Namespace imports for backward compatibility
   - Standalone functions for better modularity
   - Consistent camelCase naming convention

2. **New Import Styles**

```js
// Direct imports (recommended for tree-shaking)
import { visibility } from "pwafire";
import { loadOnScroll } from "pwafire";
import { install } from "pwafire";
import { copyText, readText } from "pwafire";

// Direct import with path
import { visibility } from "pwafire/visibility";

// Namespace imports (backward compatibility)
import { pwa } from "pwafire";

pwa.visibility();
pwa.lazyLoad.loadOnScroll();
pwa.install();
pwa.clipboard.copyText();
```

3. **Standalone Functions**

```js
// Contacts API
import { contacts } from "pwafire";
const result = await contacts(["name", "email"], { multiple: true });

// Idle Detection API
import { idleDetection } from "pwafire";
const result = await idleDetection(
  "start",
  () => {
    console.log("User is idle");
  },
  120000
);
```

### Naming Conventions

- Single word methods are lowercase (e.g., `visibility`)
- Multi-word methods use camelCase (e.g., `webShare`, `loadOnScroll`)
- All API methods follow consistent naming patterns

### Installation

```bash
npm install pwafire@latest
```

### Documentation

For detailed documentation and examples, visit [docs.pwafire.org](https://docs.pwafire.org/get-started).

### Browser Support

All APIs are stable in **Chrome 80** and later versions, including **MS Edge**. Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) status.

### Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Progressive Web Apps API of APIs

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started) site.

An open-source library and framework for building fast, reliable, and engaging Progressive Web Apps (PWAs).

![CI](https://img.shields.io/npm/dm/pwafire)

## Installation

### Via NPM

```bash
npm install pwafire --save
```

### Via CDN (ES6 Module)

#### Latest version

```js
import { pwa } from "https://unpkg.com/pwafire/esm/index.js";
```

#### Specific version

```js
import { pwa } from "https://unpkg.com/pwafire@3.0.8/esm/index.js";
```

## Quick Start

### Import in your React app

```js
import { pwa } from "pwafire";
```

### Share data

```js
// Using webShare (camelCase for multi-word methods)
pwa.webShare(data);

// Using visibility (lowercase for single word)
pwa.visibility();
```

## API Feature Detection

- Allows custom handlers when needed
- Experimental approach that will be updated
- Built for available stable APIs

### Example: Web Share Detection

```js
// Get the check instance from pwafire
import { check } from "pwafire";

// Check if Web Share is supported
const supported = await check.webShare();
```

## Supported Web Capabilities

| Feature                                                | Stability |
| ------------------------------------------------------ | --------- |
| Install (Custom)                                       | ✅        |
| Background Sync                                        | ✅        |
| Badging                                                | ✅        |
| Contact Picker                                         | ✅        |
| Screen Wake Lock                                       | ✅        |
| Content Indexing                                       | ✅        |
| Copy Text                                              | ✅        |
| Read Text (Clipboard)                                  | ✅        |
| Copy Images                                            | ✅        |
| Read Files (Clipboard)                                 | ✅        |
| Push Notifications                                     | ✅        |
| Web Share                                              | ✅        |
| Web Payments                                           | ✅        |
| [View All (14+)](https://docs.pwafire.org/get-started) | ✅        |

## Community

### Communication Channels

| Channel | Link                                                                                                                                                                         |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter | [@pwafire](https://twitter.com/pwafire)                                                                                                                                      |
| Slack   | [Join Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI) |

### Contribute

Propose your feature by [creating an issue](https://github.com/pwafire/pwafire/issues/new).

### License

[MIT License](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE)
