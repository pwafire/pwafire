## Install pwafire via NPM

```bash
npm i pwafire --save
```

### Get pwafire over CDN as an E6 Module

```js
import pwafire from 'https://unpkg.com/pwafire/esm/index.js';
const pwa = pwafire.pwa;
```

### Import pwafire in your for e.g React App

```js
import pwafire from 'pwafire';
const pwa = pwafire.pwa;
```

All stable in **Chrome 80** and later versions, also in **MS Edge**. Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) status.

### API Spec

For promise types, the promise value returned is an object

```js
// Success...
{ type: 'success', message: 'Copied' }
 // Fail...
{ type: 'fail', error };
```

#### Do something with the promise value returned for e.g copyText;

```js
// Copy text
pwa.copyText(text).then((res) => {
  // Do something with 'res'
  if (res.type === 'success') {
    // Success...
  }
});
```

### 1. Copy Text

Copy text to clipboard.

#### Copy text to clipboard

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
  url: 'https://pwafire.org',
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
const props = ['name', 'email', 'tel'];
const options = { multiple: true };
```

#### Call the contacts method on pwa, the promise resolves with an object

```js
// Do something with the promise value...
pwa.Contacts(props, options).then((res) => {
  // Do something with contacts...
  const contacts = res.type === 'success' ? res.contacts : null;
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
  title: 'Hello Notification!',
  options: {
    body: 'Progressive Web App Hello Notification!',
    icon: '../images/icons/icon-192x192.png',
    tag: 'pwa',
  },
};
```

#### Call the notification method, pass in `data` object, for e.g

```js
// Call the notification method...
pwa.Notification(data);
```

### 8. Install

Add custom install button, provide a "button element" as the parameter

#### Call the install method

```js
pwa.Install(button);
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

### 12. Web Payments

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
const validatePayment = paymentResponse => {
  // Destructure to get payment responses
  const { details, shippingAddress, shippingOption } = paymentResponse;

  // Destructure to get card details...
  const {
    cardNumber,
    cardSecurityCode,
    cardholderName,
    expiryMonth,
    expiryYear
  } = details;

  // Destructure to get billing address...
  const {
    addressLine,
    city,
    country,
    dependentLocality,
    organization,
    phone,
    postalCode,
    recipient,
    region,
    sortingCode
  } = details.billingAddress;

  // Validate...
  let condition;
  if (condition) {
    //...
    // Return sucess
    return paymentResponse.complete("success");
  } else {
    //...
    // Return failure
    return paymentResponse.complete("failure");
  }
};
```

#### Call Payment method on pwa...

```js
// Pay...
  pwa.Payment(paydata, validatePayment);
```
