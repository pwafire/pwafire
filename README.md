# Progressive Web Apps API of APIs (Sponsor us)

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started) site.

An open-source library and framework for building fast, reliable, and engaging Progressive Web Apps (PWAs). It provides developers with a set of tools and resources to simplify the process of creating PWAs, including pre-built components, templates, and best practices. PWA Fire is designed to be easy to use and adaptable to a wide range of use cases, from simple blogs to complex web applications. Its goal is to empower developers to build high-quality PWAs that provide a native app-like experience to users, regardless of their device or platform

<span><img src="https://img.shields.io/npm/dm/pwafire" alt="CI" /></span>

## Introducing _pwafire_ cdn and npm

Progressive Web Apps **API of APIs**. All New Web Capabilities as one Package.

### Install pwafire via NPM

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

### Example : using _pwafire_

#### Import pwafire in your react app

```js
import { pwa } from "pwafire";
```

#### Call the share method on pwa

```js
pwa.Share(data);
```

Preview Documentation : [Get Started](https://docs.pwafire.org/get-started)

## API Feature Detection

- Goal is to allow room for custom handlers if need be
- This approach is going to be experimental and will be updated
- This addition is going to be built for available stable apis

### Example and use case

- Web Share is both on Edge desktop and mobile, but not with chrome. I'd like to show a copy link button for chrome
- Install latest pwafire version, already up for testing in v4 alpha-3\*

```bash
 npm i --save pwafire
```

- Try it out

```js
// Get the check instance from pwafire.
import { check } from "pwafire";
//...
// The response is a boolean, true or false.
const supported = await check.Share();
// You can get a list of all apis and their support status as well.
const all = await check.All();
```

## PWAs : New Web Capabilities(Project Fugu)

| Feature                                                     | Stabilty |
| ----------------------------------------------------------- | -------- |
| Install(Custom)                                             | ok       |
| Background Sync                                             | ok       |
| Badging                                                     | ok       |
| Contact Picker                                              | ok       |
| Screen Wake Lock                                            | ok       |
| Content Indexing                                            | ok       |
| Copy Text                                                   | ok       |
| Read Text(Clipboard)                                        | ok       |
| Copy Images                                                 | ok       |
| Read Files(Clipboard)                                       | ok       |
| Push Notifications                                          | ok       |
| Web Share                                                   | ok       |
| Web payments                                                | ok       |
| [View All, 10 + Here](https://docs.pwafire.org/get-started) | 14       |

## Chat : Join the conversation

Follow our [Developer Account](https://twitter.com/pwafire) on [Twitter](https://twitter.com/pwafire). Get Live Help on our [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI).

| Communication Channel | Talk to us                              |
| --------------------- | --------------------------------------- |
| Twitter Chat          | [Tweet us](https://twitter.com/pwafire) |

### Contribute

Propose your Feature by [Creating an Issue](https://github.com/pwafire/pwafire/issues/new)

### License

| License     | Link                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| MIT License | [View License](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE) |
