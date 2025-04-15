# PWAFire 🔥

A modern, modular library for building Progressive Web Apps with ease. PWAFire provides a comprehensive set of APIs and utilities to enhance your web applications with PWA capabilities. Built on top of Project Fugu, PWAFire helps bridge the gap between web and native app capabilities.

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
- 📝 Comprehensive documentation
- 🧪 Extensive test coverage

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

### Basic Usage

```js
// Modern import (recommended)
import { copyText } from "pwafire";

// Check page visibility
const state = await copyText("Text to copy");
```

### CDN Usage

```html
<script type="module">
  import { pwa } from "https://unpkg.com/pwafire@5.1.8/lib/index.mjs";

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

### Error Handling

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

| Feature                                                | Stability | Description                     | Documentation                                         |
| ------------------------------------------------------ | --------- | ------------------------------- | ----------------------------------------------------- |
| Install (Custom)                                       | ✅        | Custom PWA installation         | [Docs](https://docs.pwafire.org/api/install)          |
| Background Sync                                        | ✅        | Background data synchronization | [Docs](https://docs.pwafire.org/api/background-sync)  |
| Badging                                                | ✅        | App badge management            | [Docs](https://docs.pwafire.org/api/badging)          |
| Contact Picker                                         | ✅        | Contact selection               | [Docs](https://docs.pwafire.org/api/contacts)         |
| Screen Wake Lock                                       | ✅        | Prevent screen from sleeping    | [Docs](https://docs.pwafire.org/api/wake-lock)        |
| Content Indexing                                       | ✅        | Content search indexing         | [Docs](https://docs.pwafire.org/api/content-indexing) |
| Clipboard                                              | ✅        | Copy/read text and files        | [Docs](https://docs.pwafire.org/api/clipboard)        |
| Push Notifications                                     | ✅        | Web push notifications          | [Docs](https://docs.pwafire.org/api/notifications)    |
| Web Share                                              | ✅        | Native sharing                  | [Docs](https://docs.pwafire.org/api/web-share)        |
| Web Payments                                           | ✅        | Payment processing              | [Docs](https://docs.pwafire.org/api/payment)          |
| Visibility                                             | ✅        | Page visibility detection       | [Docs](https://docs.pwafire.org/api/visibility)       |
| LazyLoad                                               | ✅        | Image lazy loading              | [Docs](https://docs.pwafire.org/api/lazy-load)        |
| [View All (14+)](https://docs.pwafire.org/get-started) | ✅        | Complete API list               | [Docs](https://docs.pwafire.org/api)                  |

## 🔍 Feature Detection

PWAFire includes built-in feature detection:

```js
import { check } from "pwafire";

// Check if Web Share is supported
const isShareSupported = await check.webShare();

// Check if Clipboard API is supported
const isClipboardSupported = await check.clipboard();

// Check multiple features
const features = await check.all();
```

## 🌐 Browser Support

All APIs are stable in:

- Chrome 80+
- Microsoft Edge
- Firefox
- Safari

Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) for detailed compatibility information.

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/pwafire/pwafire.git

# Install dependencies
npm install

# Start development
npm run dev
```

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

- [Twitter](https://twitter.com/pwafire) - Follow us for updates and announcements

## 🐛 Issues

Found a bug? Please [create an issue](https://github.com/pwafire/pwafire/issues/new) to help us improve!

## 📦 Related Projects

- [PWAFire CLI](https://github.com/pwafire/cli) - Command line tool for PWAFire
- [PWAFire VS Code Extension](https://marketplace.visualstudio.com/items?itemName=pwafire.pwafire) - VS Code extension for PWAFire
- [PWAFire Templates](https://github.com/pwafire/templates) - Starter templates for PWAFire
