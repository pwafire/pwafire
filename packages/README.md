## Introducing *pwafire* cdn and npm 

 All New Web Capabilities as one Package! All APIs bundled together.

### Install pwafire via NPM

```bash
   npm i pwafire
```

### Or get pwafire NPM version via CDN

```js
   <script crossorigin src="https://unpkg.com/pwafire@latest"></script>
```

### Get pwafire over CDN

```html
   <!-- Insert this script at the bottom of the HTML, but before you use any PWA Capability -->
   <script crossorigin src="https://pwafire.org/code/cdn/releases/1.0.0/pwafire.js"></script>
```

### Example : using *pwafire*

#### Import pwafire in your react app

```js
   import pwafire from "pwafire";
   const pwa = pwafire.pwa;
```
#### Call the share method on pwa

```js
   pwa.Share(element, data);
```

### Get started

 - Over [NPM docs](https://github.com/pwafire/pwafire/tree/master/packages/npm)
 
 - Over [CDN docs](https://github.com/pwafire/pwafire/tree/master/packages/cdn)
