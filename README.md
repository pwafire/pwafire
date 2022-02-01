## Progressive Web Apps API of APIs (Sponsor us)

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started) site.

<span>![Build package](https://github.com/pwafire/pwafire/workflows/Build%20package/badge.svg)</span> <span><img src="https://img.shields.io/npm/dm/pwafire" alt="CI" /></span>

### Breaking change for v4.0.0 moving forward

All **responses** returned have a new `ok` value, a boolean type which replaces `success` value, a boolean as shown below;

```js
// Async API...
const res = await pwa.CopyText(text);

// Lower versions...
if (res.success) {
  // Do something...
}

// New version starting v4.0.0
if (res.ok) {
  // Do something...
}
```

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

## PWA : New Web Capabilities

| Feature                                                     | Stabilty |
| ----------------------------------------------------------- | -------- |
| Custom Install Button                                       | ok       |
| Background Sync                                             | ok       |
| Badging                                                     | ok       |
| Contact Picker                                              | ok       |
| Share Target                                                | ok       |
| Screen Wake Lock                                            | ok       |
| Content Indexing                                            | ok       |
| Web payments                                                | ok       |
| Copy Images                                                 | ok       |
| Push Notifications                                          | ok       |
| Web Share                                                   | ok       |
| [View All, 10 + Here](https://docs.pwafire.org/get-started) | 14       |

## API Feature Detection

- Goal is to allow room for custom handlers if need be
- This approach is going to be experimental and will be updated
- This addition is going to be built for available stable apis

### Example and use case

- Web Share is both on Edge desktop and mobile, but not with chrome. I'd like to show a copy link button for chrome
- Install latest pwafire version, already up for testing in v4 alpha-3\*

```bash
 npm i --save pwafire@latest
```

- Try it out

```js
// Get the check instance from pwafire...
import { check } from "pwafire";
//...
// The response is a boolean, true or false...
const supported = await check.Share();
```

## Chat : Join the conversation

Follow our [Developer Account](https://twitter.com/pwafire) on [Twitter](https://twitter.com/pwafire). Get Live Help on our [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI).

| Communication Channel | Talk to us                              |
| --------------------- | --------------------------------------- |
| Twitter Chat          | [Tweet us](https://twitter.com/pwafire) |

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/pwafire/pwafire/graphs/contributors"><img src="https://opencollective.com/pwafire/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/pwafire/contribute)]

### Individuals

<a href="https://opencollective.com/pwafire"><img src="https://opencollective.com/pwafire/individuals.svg?width=890"></a>

### Organizations

Support this project with your organization. Your logo will show up here with a link to your website [[Contribute](https://opencollective.com/pwafire/contribute)]

<a href="https://opencollective.com/pwafire/organization/0/website"><img src="https://opencollective.com/pwafire/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/1/website"><img src="https://opencollective.com/pwafire/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/2/website"><img src="https://opencollective.com/pwafire/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/3/website"><img src="https://opencollective.com/pwafire/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/4/website"><img src="https://opencollective.com/pwafire/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/5/website"><img src="https://opencollective.com/pwafire/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/6/website"><img src="https://opencollective.com/pwafire/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/7/website"><img src="https://opencollective.com/pwafire/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/8/website"><img src="https://opencollective.com/pwafire/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/9/website"><img src="https://opencollective.com/pwafire/organization/9/avatar.svg"></a>

### Contribute

Propose your Feature by [Creating an Issue](https://github.com/pwafire/pwafire/issues/new)

### License

| License     | Link                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| MIT License | [View License](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE) |
