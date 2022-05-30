## Progressive Web Apps API of APIs (Sponsor us)

Build Scalable Progressive Web Apps. Start via [docs.pwafire.org](https://docs.pwafire.org/get-started) site.

Welcome to **@pwafire v.4.0.0** which is the second iterational foundation for our next generation of the pwafire api. Note that, these release is a breaking change, before upgrading, check the documentations first.

### Breaking change for v4.0.0 moving forward

All **responses** returned have a new `ok` value, a boolean type which replaces `success` value, a boolean as shown below;

### API Spec

For all promise types, the promise value returned is an object - might include additional data for example, **Contacts API** returns an additional **contacts** value.

```js
// For Success, ok value is true...
{
  ok : true,
  message : "Success message",
}
// For Fail, ok value is false...
{
  ok : false,
  message : "Error message"
}
```

```js
// Async API...
const res = await pwa.CopyText(text);

// Lower versions...
if (res.success) {
  // Do something...
}

// New version starting v4.0.0
if (res.ok) {
  // Do something...
}
```

#### Do something with the response returned for e.g copyText;

```js
// Copy text
pwa
  .copyText(text)
  .then((res) => {
    // Do something with 'res'
    if (res.ok) {
      // Success...
    } else {
      // Fail...
    }
  })
  .catch((err) => {
    // Do something with 'err'
  });
```

## API Feature Detection

## Install pwafire via NPM

```bash
npm i pwafire --save
```

### Get pwafire over CDN as an E6 Module

Note that you can still use a specific version over the pwafire cdn

#### Latest version

```js
import { pwa } from "https://unpkg.com/pwafire/esm/index.js";
```

#### Specific version

```js
import { pwa } from "https://unpkg.com/pwafire@3.0.8/esm/index.js";
```

### Import pwafire in your for e.g React App

```js
import { check, pwa } from "pwafire";
```

All stable in **Chrome 80** and later versions, also in **MS Edge**. Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) status.

- Goal is to allow room for custom handlers if need be
- This approach is going to be experimental and will be updated
- This addition is going to be built for available stable apis

### Example and use case

- Web Share is both on Edge desktop and mobile, but not with chrome. I'd like to show a copy link button for chrome
- Install latest pwafire version, already up for testing in v4 alpha-3\*

```bash
 npm i --save pwafire@latest
```

- Try it out

```js
// Get the check instance from pwafire...
import { check } from "pwafire";
//...
// The response is a boolean, true or false...
const isSupported = await check.Share();
```

### 1. Copy Text

Copy text to clipboard.

#### Call the copyText method on pwa

```js
// Copy text
pwa.copyText(text);
```

### 2. Copy image (Only PNG are supported for security purposes) to clipboard

Copy png images to clipboard

#### Call the copyImage method on pwa

```js
pwa.copyImage(imgURL);
```

### 3. Web Share

Share links, text, and files to other apps installed on the device.

#### Define the data object to be shared

```js
const data = {
  // Title of what to share
  title: `Some title..`,
  // Text to share
  text: `Some text...`,
  // Url to share...
  url: "https://pwafire.org",
};
```

#### Call the share method on pwa

```js
pwa.Share(data);
```

### 4. Contacts Picker

[Contacts Picker API](https://github.com/pwafire/pwafire/tree/master/bundle/contact-picker) allows a PWA to access contacts from the mobile device's native contacts manager.

**Chrome 80** or higher running on **Android M or later** required.

#### Define the "properties" and "select type" option you need

```js
const props = ["name", "email", "tel"];
const options = { multiple: true };
```

#### Call the contacts method on pwa, the promise resolves with an object

```js
// Do something with the promise value...
pwa.Contacts(props, options).then((res) => {
  // Do something with contacts...
  const contacts = res.ok ? res.contacts : null;
  //...
});
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

### 6. Fullscreen

Open app in fullscreen on a click event

#### Call the fullscreen method

```js
pwa.Fullscreen();
```

### 7. Notifications

Show notifications. Pass a **data** object

#### Add notification data

```js
const data = {
  title: "Hello Notification!",
  options: {
    body: "Progressive Web App Hello Notification!",
    icon: "../images/icons/icon-192x192.png",
    tag: "pwa",
  },
};
```

#### Call the notification method, pass in `data` object, for e.g

```js
// Call the notification method...
pwa.Notification(data);
```

### 8. Cunstom Installation prompt

Add custom install button, provide a installation step **type** (`before, installed or install`), and a **callback** function. This is a new feature in v4.0.7+

#### Installation steps;

- Step `installed` => Check if the app is installed, e.g for react it'd be:

  ```js
  // 1. Check if app was installed...
  pwa.Install("installed", () => {
    // b) => Hide the app-provided install promotion custom button.
    setIsInstalled(true);
    // c) => Clear the deferredPrompt so it can be garbage collected.
    setSavedDefferedPrompt(null);
    // d) => Optionally, send analytics event to indicate successful install, e.g with custom analytics:
    analytics.track({
      event: "install",
      category: "pwa",
      label: "install",
    });
  });
  ```

  - Step `before` => Check if the app is installed, e.g for react it'd be:

  ```js
  // 2. Before install prompt is shown.
  pwa.Install("before", (event) => {
    // Prevent the mini-infobar from appearing e.g for mobile.
    if (window.matchMedia("(min-width: 767px)").matches) {
      event.preventDefault();
    }
    // a) => Stash the event so it can be triggered later on.
    setSavedDefferedPrompt(event);
    // b) => Update UI notify the user they can install the PWA.
    setIsInstalled(false);
    // c) => Optionally, send analytics event that PWA install promo was shown, e.g with custom analytics:
    analytics.track({
      event: "install",
      category: "pwa",
      label: "install-prompt",
    });
  });
  ```

  - Step `install` => Install the app, e.g for react it'd be:

  ```js
  // 3. Show the install prompt.
  pwa.Install("install", async (event: string) => {
    // Event type is install.
    console.log(event);
    // a) => Show the install prompt.
    savedDefferedPrompt.prompt();
    // b) =>  Wait for the user to respond to the prompt.
    const { outcome } = await savedDefferedPrompt.userChoice;
    if (outcome === "accepted") {
      // c, i) =>  Optionally, send analytics event with outcome of user choice.
    } else {
      // c, ii) => Optionally, send analytics event with outcome of user choice.
    }
    // d) => We've used the prompt, and can't use it again, throw it away.
    setSavedDefferedPrompt(null);
  });
  ```

### 9. Badging

#### Add badging for app icons

Badging makes it easy to subtly notify the user that there is some new activity that might require their attention, or indicate a small amount of information, such as an unread count.

##### Set the badge

Returns an object, which is either a success or an error type

```js
// Set the badge
const unreadCount = 24;
pwa.setBadge(unreadCount);
```

##### Clear the badge

```js
// Clear the badge
pwa.clearBadge();
```

### 10. Screen Wake Lock API

The Screen Wake Lock API provides a way to prevent devices from dimming or locking the screen when an application needs to keep running.

#### Call the install method, returns a promise value

```js
pwa.WakeLock();
```

### 11. Visibility

Check if user is viewing a page. Pause/play video or games e.t.c

#### Define page visibilty handler

```js
// Do something....
const isVisible = () => {
  //...
};
```

#### If visbility api is not supported, define the handler

```js
// Do something....
const notAvailable = () => {
  //...
};
```

#### Call the visibility method with the two arguments

```js
pwa.Visibility(isVisible, notAvailable);
```

### 12. The File System Access API

_The File System Access API_ allows web apps to read or save changes directly to files and folders on the user's device.

#### Call pickFile method on pwa

The promise resolves with a file response

```js
// Do something with the contents...
const res = await pwa.pickkFile();
const file = res.ok ? res.file : null;
```

#### Call the pickTextFile method on pwa

The promise resolves with a text response(contents of the picked text file)

```js
// Do something with the contents...
const res = await pwa.pickTextFile();
const contents = res.ok ? res.contents : null;
```

### 13. Content Indexing

This API allows you to index your offline-capable pages.

#### Call the contentIndexing method on pwa

Note : The Content Indexing API was launched in Chrome 84 for Android.

```js
const index = await pwa.contentIndexing();
if (index.ok) {
  // Do something...like
  // 1. Add a page to the index...
  // 2. Remove a page from the index...
  // 3. Get all indexed pages...
}
```

#### Add a page to the index

```js
const res = await index.addItem({
  // Required; set to something unique within your web app.
  id: "article-123",
  // Required; url needs to be an offline-capable HTML page.
  url: "/articles/123",
  // Required; used in user-visible lists of content.
  title: "Article title",
  // Required; used in user-visible lists of content.
  description: "Amazing article about things!",
  // Required; used in user-visible lists of content.
  icons: [
    {
      src: "/img/article-123.png",
      sizes: "64x64",
      type: "image/png",
    },
  ],
  // Optional; valid categories are currently:
  // 'homepage', 'article', 'video', 'audio', or '' (default).
  category: "article",
});
```

#### Remove a page from the index

```js
const res = index.removeItem({
  // Required; provide the id of the item to remove...
  id: "article-123",
});
```

#### Get all indexed pages

```js
const items = await index.getAll();
```

### 14. Web Payments

Allows users select their preferred way of **paying for things**, and make that information
available to **a merchant.**

#### Call Payment method with three arguments

```js
pwa.Payment(pay, paydata, validatePayment);
```

#### Example : compute total amount to pay

Test Demo Application : [Live Preview](https://webpay.glitch.me/)

```js
// Calculations...
const payment = {
  price: sale_price,
  get discount() {
    return this.price * 0.005;
  },
  get total() {
    return this.price + this.tax - this.discount;
  },
  get tax() {
    return 0.14 * this.price;
  },
};

// Destructure payment object...
const { tax, discount, total } = payment;
```

#### Set Payment methods

```js
const paymentMethods = [
  {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: ["visa", "mastercard"],
    },
  },
];
```

#### Set Payment details

```js
const paymentDetails = {
  total: {
    label: "Total Amount",
    amount: {
      currency: "KSH",
      value: total.toString(),
    },
  },
  displayItems: [
    {
      label: "Discount",
      amount: {
        currency: "KSH",
        value: discount.toString(),
      },
    },
    {
      label: "Taxes, 14% V.A.T",
      amount: {
        currency: "KSH",
        value: tax.toString(),
      },
    },
  ],
};
```

#### Requesting additional info

```js
const options = {
  requestPayerName: true,
  requestPayerEmail: true,
};
```

#### Create paydata object

```js
const paydata = {
  paymentMethods,
  paymentDetails,
  options,
};
```

#### Validate payment (Do something with the Payment Response)

```js
const validatePayment = async(paymentResponse) => {
  try {
    // Check if payment was successful based on your payment gateway.
    const condition = await yourSuccessHandler(paymentResponse);
  // Please note that complete status can only be "success" or "fail".
    if (condition) {
      //...
      // Return sucesss...
      await paymentResponse.complete("success");
    } else {
      //...
      // Return fail...
      await paymentResponse.complete("fail");
    }
  };
  } catch(error) {
    throw error;
  }
```

#### Call Payment method on pwa

```js
// Pay...
pwa.Payment(paydata, validatePayment);
```
