# PWAFire (Progressive Web Apps APIs)

A modern, modular library for building Progressive Web Apps with ease. PWAFire provides a comprehensive set of APIs and utilities to enhance your web applications with PWA capabilities. Built on top of Project Fugu, PWAFire helps bridge the gap between web and native app capabilities.

[![npm version](https://badge.fury.io/js/pwafire.svg)](https://badge.fury.io/js/pwafire)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/Docs-docs.pwafire.org-blue)](https://docs.pwafire.org/get-started)
[![Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

For complete documentation and examples, visit [Get Started with PWAFire](https://docs.pwafire.org/get-started).

## Features

- Modern, tree-shakeable API design
- Comprehensive PWA capabilities
- Zero dependencies
- TypeScript support
- Universal browser support
- Multiple import options (ESM, CJS, CDN)
- Consistent camelCase naming convention
- Built-in feature detection
- Comprehensive documentation
- Extensive test coverage

## Quick Start

### Installation

```bash
# Using npm
npm install pwafire@latest

# Using yarn
yarn add pwafire@latest

# Using pnpm
pnpm add pwafire@latest
```

### Import Patterns

PWAFire supports two import patterns for optimal flexibility and tree-shaking:

1. **Root Import** (Recommended for multiple features):

   ```ts
   import { copyText, webShare } from "pwafire";
   ```

2. **Scoped Import** (Recommended for single features):
   ```ts
   import { copyText } from "pwafire/clipboard";
   import { webShare } from "pwafire/web-share";
   ```

The scoped import pattern is recommended when you only need specific features, as it enables better tree-shaking and smaller bundle sizes.

### Basic Usage

```ts
// Using root import
import { copyText } from "pwafire";

// Using scoped import (recommended for single features)
import { copyText } from "pwafire/clipboard";

const { ok, message } = await copyText("Text to copy");
```

### CDN Usage

```html
<script type="module">
  // Using root import
  import { copyText } from "https://unpkg.com/pwafire@latest/lib/index.mjs";

  // Using scoped import
  import { copyText } from "https://unpkg.com/pwafire@latest/lib/pwa/clipboard/index.mjs";

  const result = await copyText("Text to copy");
</script>
```

### Error Handling

```ts
import { copyText } from "pwafire/clipboard";

const handleCopy = async (text: string) => {
  try {
    const { ok, message } = await copyText(text);
  } catch (error) {
    // Handle error
  }
};

await handleCopy("Hello World");
```

## Feature Detection

```ts
// Using root import
import { check } from "pwafire";

const checkFeatures = async () => {
  const [isShareSupported, isClipboardSupported] = await Promise.all([
    check.webShare(),
    check.clipboard()
  ]);
};

await checkFeatures();
```

```ts
// Using scoped import
import { webShare, clipboard } from "pwafire/check";

const checkFeatures = async () => {
  const [isShareSupported, isClipboardSupported] = await Promise.all([
    webShare(),
    clipboard()
  ]);
};

await checkFeatures();
```

## Browser Support

All APIs are stable in:

- Chrome 80+
- Microsoft Edge
- Firefox
- Safari

Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) for detailed compatibility information.

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Contributing

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

## License

MIT © [PWAFire](https://github.com/pwafire)

## Documentation

For detailed documentation and examples, visit [Get Started with PWAFire](https://docs.pwafire.org/get-started).

## Community

- [Twitter](https://twitter.com/pwafire) - Follow us for updates and announcements

## Issues

Found a bug? Please [create an issue](https://github.com/pwafire/pwafire/issues/new) to help us improve!

## Related Projects

- [PWA VS Code](https://marketplace.visualstudio.com/items?itemName=mayeedwin.vscode-pwa) - Progressive Web Apps Code Snippets (Including Workbox Support)
