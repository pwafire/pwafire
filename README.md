# pwafire
Official Github Repo for Project PWA Fire

### Manifest.json Guide

```json

// add a link tag to all the pages that encompass your web app, as shown below;
// <link rel="manifest" href="/manifest.json">
{
 "background_color": "#fff", // set the background color
 "display": "standalone", // set the launch style / you make your web app hide the browser's UI by setting the display type to standalone
 "theme_color": "#fff", // set the background color
    
  "short_name": "PWA Fire", // a short_name for use as the text on the users home screen / rename this
  "name": "Your Web App Name", // a name for use in the Web App Install banner / rename this
  "icons": [
    {
      "src": "images/pwamayeedwin.png", // replace with your image/icon path
      "type": "image/png",
      "sizes": "48x48" // must be this size
    },
    {
      "src": "images/pwamayeedwin.png", // replace with your image/icon path
      "type": "image/png",
      "sizes": "96x96" // must be this size
    },
    {
      "src": "images/mayepwalogo192.png", // replace with your image/icon path
      "type": "image/png",
      "sizes": "192x192" // must be this size
    }
    ,
    {
      "src": "images/mayepwa512.png", // replace with your image/icon path
      "type": "image/png",
      "sizes": "512x512" // must be this size
    }
    
  ],
  "start_url": "index.html?launcher=true" // do not replace this // it is default 
    // though this can be anything you want; 
    //the value we're using has the advantage of being meaningful to Google Analytics.
}

```
