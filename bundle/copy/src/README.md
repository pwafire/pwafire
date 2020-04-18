## Asynchronous Clipboard API

The [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) provides the ability to respond to clipboard commands (cut, copy, and paste) as well as to asynchronously 
read from and write to the system clipboard.

### Copy: writing text to the clipboard 

To copy text to the clipboard, call **navigator.clipboard.writeText()**. Since this API is asynchronous, 
the **writeText()** function returns a promise that resolves or rejects depending on whether the 
passed text is copied successfully

#### Adding Copy

Create an empty **Copy.js** module in your App say in some folder, **./folder-name/**. Then copy [this code 
snippet](https://github.com/pwafire/pwafire/blob/master/bundle/copy/src/Copy.js) to it.

You need to first, import the **Copy** module. The Text method takes in two variables, the **element**; 
whose text needs to be copied and **text**; the text to copy.

```js
   // Import the Copy class
   import { Copy } from './folder-name/Copy.js';
   // Create an instance of Copy class
   let copy = new Copy();
   // Call the Text method to copy text...
   copy.Text(element, text);
```
