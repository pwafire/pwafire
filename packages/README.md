## 🦴 Add PWA from CDN to your JS Project

```html
 <!-- Insert this script at the bottom of the HTML, but before you use any PWA Capability -->
 <script src="https://pwafire.org/code/cdn/releases/1.0.0/pwafire.js"></script>
```

All stable in **Chrome 80** and later versions, also in **MS Edge**. Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) status.

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
### 2. Copy image (Only PNG are supported for security purposes)
Copy png images to clipboard

#### Add the image element or copy element(button)

```js
const img = document.querySelector(".copy-image");
const imgURL = img.src;
```

#### Call the copyImage method on pwa

```js
img.addEventListener("click", event => {
  event.preventDefault();
  pwa.copyImage(imgURL);
});
```

### 3. Web Share

Share links, text, and files to other apps installed on the device

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

### 4. Contacts Picker

Access contacts from the device's native contacts manager. **Chrome 77** or higher running on **Android M or later** required. 

#### Add the contact picker element(button)

```js
const element = document.querySelector(".contacts-picker");
```

#### Define the "properties" and "select type" option you need

```js
const props = ["name", "email", "tel"];
const options = { multiple: true };
```

#### Call the contacts method on pwa, it returns selected contacts

```js
pwa.Contacts(element, props, options);
// You can save the return value in a vaibale...
let contacts = pwa.Contacts(element, props, options);
```

### 5. Show PWA Connectivity status

Pass in two call back funtions, aka **online** and **offline** handlers.

#### Declaring the two handlers separately

```js
// Online handler...
const online = () => {
  //...
};
// Offline handler...
const offline = () => {
  //...
};
```

#### Call the connectivity method on pwa, adding the two parameters

```js
pwa.Connectivity(online, offline);
```
