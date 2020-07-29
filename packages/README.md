## Introducing _pwafire_ cdn and npm

All New Web Capabilities as one Package! All APIs bundled together.

### Install pwafire via NPM

```bash
 npm i pwafire
```

### Get pwafire over CDN, latest version;

```js
import pwafire from "https://pwafire.org/code/cdn/releases/@latest/pwafire.js";
const pwa = pwafire.pwa;
```

### Or a specific version

```js
import pwafire from "https://cdn.skypack.dev/pwafire@1.8.7";
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

### Get started

[API Docs](https://github.com/pwafire/pwafire/tree/master/packages/pwafire)
