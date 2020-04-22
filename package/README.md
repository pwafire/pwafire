## New Web Capabilities (PWAs)

## Add PWA from CDN to your JS Project
```html
 <!-- Insert this script at the bottom of the HTML, but before you use any PWA Capability -->
 <script src="https://pwafire.org/code/cdn/releases/1.0.0/pwa.js"></script>
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
}```