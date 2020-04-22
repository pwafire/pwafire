## Install via NPM

```bash
npm i pwafire
```

### Require the pwafire npm package

```js
const pwafire = require('pwafire');
const pwa = pwafire.pwa;
```

## Add PWA from CDN to your JS Project

```html
 <!-- Insert this script at the bottom of the HTML, but before you use any PWA Capability -->
 <script src="https://pwafire.org/code/cdn/releases/1.0.0/pwafire.js"></script>
```

## Host it youself (Recommended)

Hosting it youself allows you to use as an **ES6 Module**

### Create an empty directory(recommended) in your App and copy [this PWA core code](https://github.com/pwafire/pwafire/blob/master/package/src/index.js) to it.

```bash
./modules/pwa.js
```

### Then, import **pwa** from this Module in say your ***App.js***

```js
import { pwa } from "./modules/pwafire.js";
```

### 1. Copy Text
Copy text to clipboard

#### Copy from a single element...

```js
// Copy from a single element...
let element = document.getElementById("copy");
// Copy text...
pwa.copyText(element);
```
#### Copy from multiple elements...

```js
//  Copy from multiple elements...
let elements = document.querySelectorAll(".copy");
for (let el of elements) {
  // Copy text...
  pwa.copyText(el);
}
```