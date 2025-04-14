# Progressive Web Apps API of APIs (Sponsor us)

## 🎉 What's New in v5.1.6+

We've modernized PWAFire with cleaner, more modular APIs! Now you can import APIs directly or use the namespace:

```js
// Import specific APIs (recommended for tree-shaking)
import { copyText, readText } from "pwafire";

// Or use the namespace (for backward compatibility)
import { pwa } from "pwafire";
pwa.visibility();
pwa.lazyLoad.loadOnScroll();
pwa.install();
pwa.clipboard.copyText();
```

### New Standalone Functions

Many APIs are now available as standalone functions for better modularity:

```js
// Contacts API
import { contacts } from "pwafire/contacts";
const result = await contacts(["name", "email"], { multiple: true });
```

> **Note**: Both import styles are supported. Direct imports enable better tree-shaking while the namespace provides backward compatibility. 🚀

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started).

## About pwafire library

An open-source library and framework for building fast, reliable, and engaging Progressive Web Apps (PWAs). It provides developers with a set of tools and resources to simplify the process of creating PWAs, including pre-built components, templates, and best practices. PWA Fire is designed to be easy to use and adaptable to a wide range of use cases, from simple blogs to complex web applications. Its goal is to empower developers to build high-quality PWAs that provide a native app-like experience to users, regardless of their device or platform

## API Spec

All APIs return a promise that resolves to a result object:

```js
// For Success
{
  ok: true,
  message: "Success message",
  // Additional data specific to the API
  ...data
}

// For Failure
{
  ok: false,
  message: "Error message"
}
```

### Example Usage

```js
import { copyText } from "pwafire/clipboard";

try {
  const result = await copyText("Hello World");
  if (result.ok) {
    console.log("Text copied successfully");
  } else {
    console.log("Failed to copy text:", result.message);
  }
} catch (err) {
  console.error("Error:", err);
}
```

## API Feature Detection

## Install pwafire via NPM

```bash
npm i pwafire --save
```

### Get pwafire over CDN as an E6 Module

Note that you can still use a specific version over the pwafire cdn

#### Latest version

```js
import { pwa } from "https://unpkg.com/pwafire/esm/index.js";
```

#### Specific version

```js
import { pwa } from "https://unpkg.com/pwafire@3.0.8/esm/index.js";
```

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started).
