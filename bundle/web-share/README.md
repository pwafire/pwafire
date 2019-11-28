## Share natively with Web Share API

**The Web Share API** makes it possible for web apps to share links, text, and files to other apps installed on the device in the same way as native app. It allows the user to easily trigger the **Native Android Share Dialog** on an event like **click**.

### Web Share API checklist

 - You must be served over HTTPS
 - You can only invoke the API in response to a user action, such as a click
 - You can also share any URL, not just URLs under your website's current scope
 - And you may also share text without a URL

### Implementation

 - To add Web Share to your existing Progressive Web App then create an empty ``js`` file called ``webShare.js`` in a js folder as shown below. 

```bash
  your-project/js/webShare.js
```
 - Next thing to do is to copy the code below to the empty ``webShare.js``
 
```javascript
// look for the share button with the class `share-button`
const share = document.querySelector('.share-button');
 // listen to a click event and fire share
    share.addEventListener('click', () => {
        // check if web share is supported
        if (navigator.share) {
            navigator.share({
                // title of what to share
                title: 'Developer Resources by pwafire.org',
                // text to share
                text: 'Here are resources to learn how to build Progressive Web Apps',
                // url to share
                url: 'https://pwafire.org',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log(`Web share not supported on desktop...`);
        }
    })

```

Checkout the complete codelab on our [devdoc here](https://pwafire.org/developer/codelabs/add-navigator-share/)
