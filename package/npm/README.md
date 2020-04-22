## Install via NPM

```bash
npm i pwafire
```

### Require the pwafire npm package

```js
const pwafire = require('pwafire');
const pwa = pwafire.pwa;
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