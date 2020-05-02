
### [Your First Progressive Web App](https://pwafire.org/developer/pwa/started/)

#### [1. Code to register the service worker](https://pwafire.org/developer/pwa/started/#sw-register)
This is the first step to making your web app work *offline.* Copy and paste this code to your *index file,* eg just before the end of the *body tag* or in the *head tag* in html5

#### N/B : You need HTTPS
You can only register service workers on Websites, Web Apps or Pages served over HTTPS.

Read more about service workers [on thid tech doc](https://pwafire.org/developer/docs/service-worker/)

```html 
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
    .then(() => { console.log("[ PWA Fire Bundle ] Service Worker Registered"); });
  }
  
  );
}
</script>
```
This code checks to see if the *service worker API* is available, and if it is, the service worker at `service-worker.js` is registered once the page is loaded.

#### [2. Using the Web Manifest - app.webmanifest](https://pwafire.org/developer/pwa/started/#use-web-manifest)
When you have uploaded the *manifest* and it's on your site, add a link tag to all the pages that encompass your web app, as follows;

```html
<link rel="manifest" href="./app.webmanifest">
```

Configuring the **app.webmanifest** helps you to specify how you want your web app to look like when launched on the device.

Read more about Web Manifest [on this tech doc](https://pwafire.org/developer/docs/web-manifest/)

### [a) Service Worker // service-worker.js Guide](https://pwafire.org/developer/pwa/started/#sw-config)

Follow the steps as commented in the code below in order to correctly configure the *service-worker.js* file.

```javascript
// learn more at pwafire.org

/* Fetch events, on registration of service worker... */  
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.open('cache').then((cache) => {
    return cache.match(event.request).then((response) => {
      console.log("cache request: " + event.request.url);
       var fetchPromise = fetch(event.request).then((networkResponse) => {           
// Update the cache...                   
console.log("fetch completed: " + event.request.url, networkResponse);
  if (networkResponse) {
    console.debug("updated cached page: " + event.request.url, networkResponse);
      cache.put(event.request, networkResponse.clone());}
        return networkResponse;
          }, function (event) {   
// Rejected promise - just ignore it, we're offline...  
          console.log("Error in fetch()", event);
          event.waitUntil(
// Our 'cache' here is named *cache* in the caches.open()
          caches.open('cache').then((cache) => { 
          // Take a list of URLs, then fetch them from the server and add the response to the cache...
          return cache.addAll
          ([                    
        './index.html', // Cache your index page
        './assets/css/app.main.css', // Cache app.main css
        './images/*', // Cache all images
        './app.webmanifest',
// External url fetch, twitter's as an example...
        'https://platform.twitter.com/widgets.js',       
        ]);
        })
        );
        });
// Respond from the cache, or the network...
  return response || fetchPromise;
});
}));
});

// Always updating i.e latest version available...
self.addEventListener('install', (event) => {
    self.skipWaiting();
    console.log("Latest version installed!");
});

```
### [b) Web Manifest // app.webmanifest Guide](https://pwafire.org/developer/pwa/started/#web-manifest-config)

Follow the steps below as described in order to correctly configure the *app.webmanifest* file.

Configure/edit the background and theme colors, display type, the Web App short name, the Web App name, icons size (keep icon sizes as **specified** below) and your icon/logo paths. Also state the img type eg image/ico or image/png.

Leave the **start url** as recommended below though this can be anything you want; the value we're using has the advantage of being meaningful to **Google Analytics.**

```json
{
  "background_color": "#fff",
  "display": "standalone",
  "orientation":"portrait",
  "theme_color": "#fff",           
  "short_name": "App Name",
  "name": "App Name",
  "description": "Description of the PWA",
  "lang": "en-US",
  "icons": [
  {
  "src": "icons/pwafire512.png",
  "type": "image/png",
  "sizes": "48x48"
  },
  {
  "src": "icons/pwafire512.png",
  "type": "image/png",
  "sizes": "96x96"
  },
  {
  "src": "icons/pwafire512.png",
  "type": "image/png",
  "sizes": "192x192"
  }
  ,
  {
  "src": "icons/pwafire512.png",
  "type": "image/png",
  "sizes": "512x512"
  } 
  ],
  "start_url": "index.html?launcher=true",
  "scope": "/"
}
```
Also remember to add the theme color to all your pages as shown in the code below;

```html
<!-- theme-color -->
 <meta name="theme-color" content="#fff" />
<!-- end-theme-color -->
```

Enjoy!
