## Add PWA from CDN to your JS Project

```html
<!-- Insert this script at the bottom of the HTML, but before you use any PWA Capability -->
<script crossorigin src="https://pwafire.org/code/cdn/releases/@latest/pwafire.js"></script>
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
### 2. Copy image (Only PNG are supported for security purposes)
Copy png images to clipboard

#### Add the image element or copy element(button)

```js
const img = document.getElementById("copy-image");
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

Share links, text, and files to other apps installed on the device.

#### Add the share element(button)

```js
const element = document.getElementById("share-button");
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

[Contacts Picker API](https://github.com/pwafire/pwafire/tree/master/bundle/contact-picker) allows a PWA to access contacts from the device's native contacts manager. **Chrome 77** or higher running on **Android M or later** required. 

#### Add the contact picker element(button)

```js
const element = document.getElementById("contacts-picker");
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

### 6. Web Payments

Allows users select their preferred way of **paying for things**, and make that information
available to **a merchant.**

#### Call Payment method with three arguments

```js
let paymentResponse = pwa.Payment(pay, paydata, validatePayment);
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
  }
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
      supportedNetworks: ["visa", "mastercard"]
    }
  }
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
  requestPayerEmail: true
};
```

#### Create paydata object

```js
const paydata = {
  paymentMethods,
  paymentDetails,
  options
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

### 7. Fullscreen

Open app in fullscreen on a click event

#### Add the specific element(e.g button)

```js
const element = document.getElementById("fullscreen-button");
```

#### Call the fullscreen method

```js
pwa.Fullscreen(element);
```

### 8. Notifications

Show notification request on a click event

#### Add the specific element(e.g button)

```js
const element = document.getElementById("notification-button");
```

#### Call the notification method

```js
pwa.Notification(element);
```

### 9. Install

Add custom install button

#### Add the specific element(e.g button)

```js
const element = document.getElementById("install");
```

#### Call the install method

```js
pwa.Install(element);
```