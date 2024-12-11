# Progressive Web Apps API of APIs

An open-source library and framework for building fast, reliable, and engaging Progressive Web Apps (PWAs). Build scalable Progressive Web Apps with our comprehensive API collection.

[![NPM Downloads](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

[Get Started with Documentation](https://docs.pwafire.org/get-started)

## Installation Options

You can integrate pwafire into your project using either NPM or CDN.

### NPM Installation

To add pwafire to your project using NPM, run:

```bash
npm i pwafire --save
```

### CDN Integration

Access pwafire directly through our CDN as an ES6 Module. You can use either the latest version or specify a particular release.

For the latest version:

```js
import { pwa } from "https://unpkg.com/pwafire/dist/index.js";
```

For a specific version:

```js
import { pwa } from "https://unpkg.com/pwafire@5.1.4-rc.1/dist/index.js";
```

## Usage Example

Here's a simple example of how to use pwafire in your application:

```js
// Import pwafire in your application
import { pwa } from "pwafire";

// Use the share functionality
pwa.Share(data);
```

## Feature Detection

Pwafire includes built-in feature detection to help you provide the best experience across different browsers and platforms. Our feature detection system allows for custom handlers and adapts to varying browser support levels.

```js
// Import the check functionality
import { check } from "pwafire";

// Check if specific features are supported
const isShareSupported = await check.Share();

// Get support status for all features
const allFeatures = await check.All();
```

## Available Web Capabilities

Pwafire implements Project Fugu APIs to provide modern web capabilities. Here are the stable features currently available:

| Feature            | Status | Description                                    |
|-------------------|---------|------------------------------------------------|
| Custom Install    | Stable  | Customizable PWA installation experience       |
| Background Sync   | Stable  | Defer actions until network is available       |
| Badging          | Stable  | Add notification badges to app icons           |
| Contact Picker    | Stable  | Access device's contact list                   |
| Screen Wake Lock  | Stable  | Keep screen active when needed                 |
| Content Indexing  | Stable  | Make app content searchable                    |
| Clipboard Access  | Stable  | Read/write text, images, and files            |
| Push Notifications| Stable  | Engage users with timely updates              |
| Web Share        | Stable  | Native sharing capabilities                    |
| Web Payments     | Stable  | Streamlined payment processing                 |

[View All Features](https://docs.pwafire.org/get-started)

## Community and Support

Join our active community to get help and share your experiences:

- Follow our [Developer Account on Twitter](https://twitter.com/pwafire)
- Join our [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI) for live support
- [Create an Issue](https://github.com/pwafire/pwafire/issues/new) to propose features or report bugs

## License

This project is licensed under the [MIT License](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE).
