## Install via NPM

```bash
npm i pwafire
```

### Import pwafire in your React App

```js
import pwafire from "pwafire";
const pwa = pwafire.pwa;
```

### Require the pwafire npm package

```js
const pwafire = require("pwafire");
const pwa = pwafire.pwa;
```

### 1. Copy Text

Copy text to clipboard

#### Copy from a single element

```js
// Copy from a single element
let element = document.getElementById("copy");
// Copy text
pwa.copyText(element);
```

#### Copy from multiple elements

```js
//  Copy from multiple elements
let elements = document.querySelectorAll(".copy");
for (let el of elements) {
  // Copy text
  pwa.copyText(el);
}
```

### 2. Web Share

The Web Share API makes it possible for web apps to share links, text, and files to
other apps installed on the device.

#### Add the share element(button)

```js
const element = document.querySelector(".share-button");
```

#### Define the data object to be shared

```js
const data =  {
  // Title of what to share
  title: `Some title..`,
  // Text to share
  text: `Some text...`,
  // Url to share...
  url: 'https://pwafire.org',
}
```

#### Call the share method on pwa

```js
pwa.Share(element, data);
```
