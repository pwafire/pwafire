## Install pwafire via NPM

```bash
npm i pwafire
```

### Import pwafire in your React/Angular/Vue App

```js
import pwafire from "pwafire";
const pwa = pwafire.pwa;
```

### Require the pwafire npm package

```js
const pwafire = require("pwafire");
const pwa = pwafire.pwa;
```

All stable in **Chrome 80** and later versions, also in **MS Edge**. Check [Browser Support](https://pwafire.org/developer/tools/browser-test/) status.

### API Spec
These are async functions, and the promise value returned is an object.
Except for Payments, Install and Visibility APIs.

### 1. Copy Text

Copy text to clipboard. 

#### Copy text to clipboard

```js
// Copy text
pwa.copyText(text);
```


#### Do something with the promise value returned

```js
// Copy text
pwa.copyText(text).then(res => {
  // Do something with 'res'
  })
```

### 2. Copy image (Only PNG are supported for security purposes) to clipboard

Copy png images to clipboard

#### Add the image element or copy element(button)

```js
const img = document.getElementById("copy-image");
const imgURL = img.src;
```

#### Call the copyImage method on pwa

```js
img.addEventListener("click", (event) => {
  event.preventDefault();
  pwa.copyImage(imgURL);
});
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

[Contacts Picker API](https://github.com/pwafire/pwafire/tree/master/bundle/contact-picker) allows a PWA to access contacts from the device's native contacts manager. **Chrome 77** or higher running on **Android M or later** required.

#### Define the "properties" and "select type" option you need

```js
const props = ["name", "email", "tel"];
const options = { multiple: true };
```

#### Call the contacts method on pwa, the promise resolves with an array of contacts selected by the user.

```js
// You can save the return value in a variable...
pwa.Contacts(props, options).then(contacts => {
// Do somthing with 'contacts'
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

### 8. Install

Add custom install button

#### Call the install method

```js
pwa.Install();
```

#### 9. Visibility

Check if user is viewing a page. Pause/play video or games e.t.c

##### Define page visibilty handler

```js
// Do something....
const isVisible = () => {
  //...
  console.log(`Page Visibility Available`);
};
```

##### If visbility api is not supported, define the handler

```js
// Do something....
const notAvailable = () => {
  //...
  console.log(`Page Visibility Not Available`);
};
```

##### Call the visibility method with the two arguments

```js
pwa.Visibility(isVisible, notAvailable);
```

### 10. Web Payments

Allows users select their preferred way of **paying for things**, and make that information
available to **a merchant.**

#### Call Payment method with three arguments

```js
const paymentResponse = pwa.Payment(pay, paydata, validatePayment);
```

#### Example : compute total amount to pay

```js
// Calculations...
const payment = {
  price: 1,
  discount: 1,
  get total() {
    return this.price + this.tax - this.discount;
  },
  get tax() {
    return 0.14 * this.price;
  },
};

// Destructure payment object...
const { price, tax, discount, total } = payment;
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
      value: total
    }
  },
```

#### Set other items to display

```js
displayItems: [
    {
      label: "Discount",
      amount: {
        currency: "KSH",
        value: discount
      }
    },
    {
      label: "Taxes, 14% V.A.T",
      amount: {
        currency: "KSH",
        value: tax
      }
    }
  ]
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

#### Validate payment

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
    re.gion,
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

### Call Payment method, returns a payment response

```js
const paymentResponse = pwa.Payment(pay, paydata, validatePayment);
```
