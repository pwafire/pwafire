## Contacts Picker API

**Note : Chrome 77 or higher running on Android M or later required!**

It allows a web application to access contacts from the device's native contacts manager. Like this, your web app 
has access to your contacts' names, emails, and telephone numbers. You can specify if you want just one, 
or multiple contacts, and if you want all the fields, or just a subset of names, emails, and telephone numbers.

### How to setup?

1. In your **App**, create an empty **contactPicker.js** file and copy and paste [this code snippet to it](https://github.com/pwafire/pwafire/blob/master/bundle/contact-picker/src/contactPicker.js). Then save your changes!

2. Remember to add the contact picker button element to your web page.

```html
<!-- Add this button to your App -->
 <button id="contact-picker"> Pick Contacts </button>
```
Take the [codelab here](https://pwafire.org/developer/add-contact-picker-to-your-progressive-web-app/)
