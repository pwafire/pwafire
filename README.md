## Progressive Web Apps API of APIs (Sponsor us)

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started) site.

<span>![Build package](https://github.com/pwafire/pwafire/workflows/Build%20package/badge.svg)</span> <span><img src="https://img.shields.io/npm/dm/pwafire" alt="CI" /></span>

### Breaking change for v3.0.0 moving forward

All async responses returned have a new `success` a boolean, filed which replaces `type` a string. here is the differences;

```js

// Async API...
const res await pwa.CopyText(text);

// Lower versions...
 if(res.type === 'success')  {
   // Do something...
 }

// New version starting v3.0.0
 if(res.success)  {
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

```js
import pwafire from "https://unpkg.com/pwafire/esm/index.js";
const pwa = pwafire.pwa;
```

### Example : using _pwafire_

#### Import pwafire in your react app

```js
import pwafire from "pwafire";
const pwa = pwafire.pwa;
```

#### Call the share method on pwa

```js
pwa.Share(data);
```

Preview Documentation : [Get Started](https://docs.pwafire.org/get-started)

## PWA : New Web Capabilities

| Feature                                                                                                | Feature                   |
| ------------------------------------------------------------------------------------------------------ | ------------------------- |
| Custom Install Button                                                                                  | Offline Capabilities      |
| Background Sync                                                                                        | Native App Install Banner |
| Badging                                                                                                | Web Share                 |
| Contact Picker                                                                                         | Copy Text                 |
| Share Target                                                                                           | Copy Images               |
| Screen Wake Lock                                                                                       | Push Notifications        |
| [View All, 10 + Here](https://github.com/pwafire/pwafire/tree/master/packages#install-pwafire-via-npm) |

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
