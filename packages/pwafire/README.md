# PWAFire 🔥

A modern, modular library for building Progressive Web Apps with ease. PWAFire provides a comprehensive set of APIs and utilities to enhance your web applications with PWA capabilities.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org)

## ✨ Features

- 🔥 Modern, tree-shakeable API design
- 📱 Comprehensive PWA capabilities
- 🚀 Zero dependencies
- ⚡️ TypeScript support
- 🌐 Universal browser support
- 📦 Multiple import options (ESM, CJS, CDN)

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install pwafire

# Using yarn
yarn add pwafire

# Using pnpm
pnpm add pwafire
```

### Usage

#### Modern Import (Recommended)

```js
// Import specific APIs for better tree-shaking
import { copyText, readText } from "pwafire";
import { contacts } from "pwafire/contacts";
import { visibility } from "pwafire/visibility";

// Use the APIs
const result = await contacts(["name", "email"], { multiple: true });
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

- **Clipboard**: `copyText`, `readText`
- **Contacts**: `contacts`
- **Install**: `install`
- **LazyLoad**: `loadOnScroll`
- **Visibility**: `visibility`
- **Web Share**: `webShare`
- **And more...**

## 🔍 Feature Detection

PWAFire includes built-in feature detection:

```js
import { check } from "pwafire";

// Check if Web Share is supported
const isShareSupported = await check.webShare();

// Check if Clipboard API is supported
const isClipboardSupported = await check.clipboard();
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

## 📄 License

MIT © [PWAFire](https://github.com/pwafire)

## 📖 Documentation

For detailed documentation, visit [docs.pwafire.org](https://docs.pwafire.org).

## 💬 Community

- [Twitter](https://twitter.com/pwafire)
- [GitHub Discussions](https://github.com/pwafire/pwafire/discussions)
