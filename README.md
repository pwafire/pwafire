# PWAFire

Modern PWA APIs for building Progressive Web Apps with ease.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org/get-started)

## Installation

```bash
npm install pwafire
```

## Quick Start

```typescript
import { copyText, webShare } from "pwafire";

// Copy text to clipboard
const { ok, message } = await copyText("Hello World");

if (ok) {
  console.log("Success:", message);
}

// Share content
await webShare({
  title: "PWAFire",
  text: "Check out PWAFire!",
  url: "https://pwafire.org"
});
```

## Features

- 🎯 **Simple API** - Consistent `{ ok, message }` response format
- 🔥 **No Try/Catch** - Built-in error handling
- 📦 **Tree-shakeable** - Import only what you need
- 🎨 **TypeScript** - Full type support
- ⚡ **Zero Dependencies** - Lightweight and fast

## Try it Live

Test all PWA APIs in your browser:

**[Launch Console →](https://console.pwafire.org)**

## Documentation

For detailed guides, API reference, and examples:

📚 **[docs.pwafire.org](https://docs.pwafire.org/get-started)**

**Additional Documentation:**
- [Breaking Changes](./breaking-changes.md) - Migration guide for v6.0.0
- [Contributing](./.github/contributing.md) - Contribution guidelines
- [Code of Conduct](./.github/code-of-conduct.md) - Community standards
- [Security](./.github/security.md) - Security policy

More docs in [`docs/`](./docs) folder.

## Browser Support

- Chrome 80+
- Edge
- Firefox
- Safari

## Contributing

We welcome contributions! See [contributing.md](./.github/contributing.md) for guidelines.

## License

MIT © [PWAFire](https://github.com/pwafire)
