
### [Getting started with PWA Fire Bundle](https://pwafire.org/developer/pwa/started/)
#### 1. Code to register the service worker
This is the first step to making your web app work *offline.* Copy and paste this code to your *index file,* eg just before the end of the *body tag* or in the *head tag* in html5

#### N/B : You need HTTPS
You can only register service workers on Websites, Web Apps or Pages served over HTTPS.

Read more about service workers [HERE](https://developers.google.com/web/fundamentals/primers/service-workers/)

```html
<!-- register service worker -->
	<script>
	
	    if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
    .then(function() { console.log("Service Worker Registered! Cheers to PWA Fire!"); });
  }
  
  );
}
        </script>
<!-- end of service worker -->
```
This code checks to see if the *service worker API* is available, and if it is, the service worker at */sw.js* is registered once the page is loaded.

#### [2. Using the Web Manifest - manifest.json](https://pwafire.org/developer/pwa/started/#use-web-manifest)
When you have uploaded the *manifest* and it's on your site, add a link tag to all the pages that encompass your web app, as follows;
```html
<link rel="manifest" href="/manifest.json">
```
Configuring the **manifest.json** helps you to specify how you want your web app to look like when launched on the device.

Read more about Web Manifest [HERE](https://developers.google.com/web/fundamentals/web-app-manifest/)

### [a) Service Worker // service-worker.js Guide](https://pwafire.org/developer/pwa/started/#sw-config)
>Follow the steps as commented in the code below in order to correctly configure the *service-worker.js* file.

```javascript

// A project PWA Fire written. All writes reserved https://pwafire.org 2018.
// Author : Maye Edwin https://maye.gdgmoi.com

// after a service worker is installed and the user navigates to a different page or 
// refreshes,the service worker will begin to receive fetch events
    
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
      console.log("cache request: " + event.request.url);
       var fetchPromise = fetch(event.request).then(function(networkResponse) {           
// if we got a response from the cache, update the cache                   
console.log("fetch completed: " + event.request.url, networkResponse);
  if (networkResponse) {
    console.debug("updated cached page: " + event.request.url, networkResponse);
      cache.put(event.request, networkResponse.clone());}
        return networkResponse;
          }, function (event) {   
// rejected promise - just ignore it, we're offline!   
          console.log("Error in fetch()", event);
          event.waitUntil(
          caches.open('cache').then(function(cache) { // our cache here is named *cache* in the caches.open()
          return cache.addAll
          ([            
//cache.addAll(), takes a list of URLs, then fetches them from the server and adds the response to the cache.           
// add your entire site to the cache- as in the code below; for offline access
// If you have some build process for your site, perhaps that could generate the list of possible URLs that a user might load.               
        '/', // do not remove this
        '/index.html', //default
        '/index.html?homescreen=1', //default
        '/?homescreen=1', //default
        '/assets/css/main.css',// configure as by your site ; just an example
        '/images/*',// choose images to keep offline; just an example
// Do not replace/delete/edit the sw.js/ and manifest.js paths below
        '/sw.js',
        '/manifest.js',
//These are links to the extenal social media buttons that should be cached; we have used twitter's as an example
        'https://platform.twitter.com/widgets.js',       
        ]);
        })
        );
        });
// respond from the cache, or the network
  return response || fetchPromise;
});
}));
});

```
### [b) Web Manifest // manifest.json Guide](https://pwafire.org/developer/pwa/started/#web-manifest-config)
>Follow the steps below as described in order to correctly configure the *manifest.json* file.

Configure/edit the background and theme colors, display type, the Web App short name, the Web App name, icons size (keep icon sizes as **specified** below) and your icon/logo paths. Also state the img type eg image/ico or image/png.

Leave the **start url** as recomended below though this can be anything you want; the value we're using has the advantage of being meaningful to **Google Analytics.**

```json
{
  "background_color": "#fff",
  "display": "standalone",
  "orientation":"portrait",
  "theme_color": "#fff",           
  "short_name": "PWA Fire",
  "name": "PWA Fire Codelab",
  "description": "description or purpose of your progressive web app",
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
### [Engage us](https://twitter.com/pwafire)
Donate a star, like, follow and contribute in any way. If you use [PWA Fire Developer Resources](https://pwafire.org/developer), kindly let us know. JUST simply [Tweet us](https://twitter.com/pwafire). You got any **bug?** Report it [here for support.](https://github.com/mayeedwin/pwafire/issues/new) You want to contribute? Create your [feature here.](https://github.com/mayeedwin/pwafire/issues/new)
