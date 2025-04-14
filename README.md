# PWAFire 🔥

A modern, modular library for building Progressive Web Apps with ease. PWAFire provides a comprehensive set of APIs and utilities to enhance your web applications with PWA capabilities.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org)
[![Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

## ✨ Features

- 🔥 Modern, tree-shakeable API design
- 📱 Comprehensive PWA capabilities
- 🚀 Zero dependencies
- ⚡️ TypeScript support
- 🌐 Universal browser support
- 📦 Multiple import options (ESM, CJS, CDN)
- 🎯 Consistent camelCase naming convention
- 🔄 Built-in feature detection

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install pwafire@latest

# Using yarn
yarn add pwafire@latest

# Using pnpm
pnpm add pwafire@latest
```

### Usage

#### Modern Import (Recommended)

```js
// Direct imports for better tree-shaking
import { visibility } from "pwafire";

// Direct import with path
import { visibility } from "pwafire/visibility";

// Use the APIs
const state = await visibility();
```

#### Namespace Import (Legacy Support)

```js
import { pwa } from "pwafire";

// Use the namespace
pwa.visibility();
pwa.lazyLoad.loadOnScroll();
pwa.install();
pwa.clipboard.copyText();
```

#### Standalone Functions

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

#### CDN Usage

```html
<script type="module">
  import { pwa } from "https://unpkg.com/pwafire@latest/esm/index.js";

  // Use the API
  pwa.visibility();
</script>
```

## 📚 API Reference

All APIs return a standardized response object:

```typescript
interface APIResponse<T = any> {
  ok: boolean;
  message: string;
  data?: T;
}
```

### Example Usage

```js
import { copyText } from "pwafire/clipboard";

try {
  const result = await copyText("Hello World");

  if (result.ok) {
    console.log("Success:", result.message);
  } else {
    console.error("Error:", result.message);
  }
} catch (error) {
  console.error("Unexpected error:", error);
}
```

## 🛠 Available APIs

| Feature                                                | Stability | Description                     |
| ------------------------------------------------------ | --------- | ------------------------------- |
| Install (Custom)                                       | ✅        | Custom PWA installation         |
| Background Sync                                        | ✅        | Background data synchronization |
| Badging                                                | ✅        | App badge management            |
| Contact Picker                                         | ✅        | Contact selection               |
| Screen Wake Lock                                       | ✅        | Prevent screen from sleeping    |
| Content Indexing                                       | ✅        | Content search indexing         |
| Clipboard                                              | ✅        | Copy/read text and files        |
| Push Notifications                                     | ✅        | Web push notifications          |
| Web Share                                              | ✅        | Native sharing                  |
| Web Payments                                           | ✅        | Payment processing              |
| Visibility                                             | ✅        | Page visibility detection       |
| LazyLoad                                               | ✅        | Image lazy loading              |
| [View All (14+)](https://docs.pwafire.org/get-started) | ✅        | Complete API list               |

## 🔍 Feature Detection

PWAFire includes built-in feature detection:

```js
import { check } from "pwafire";

// Check if Web Share is supported
const isShareSupported = await check.webShare();

// Check if Clipboard API is supported
const isClipboardSupported = await check.clipboard();
```

## 🌐 Browser Support

All APIs are stable in:

- Chrome 80+
- Microsoft Edge
- Firefox
- Safari

Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) for detailed compatibility information.

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [PWAFire](https://github.com/pwafire)

## 📖 Documentation

For detailed documentation and examples, visit [docs.pwafire.org](https://docs.pwafire.org).

## 💬 Community

- [Twitter](https://twitter.com/pwafire)
- [GitHub Discussions](https://github.com/pwafire/pwafire/discussions)
- [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI)

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/pwafire/pwafire/issues/new) to help us improve!
