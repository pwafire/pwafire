## [Project PWA Fire](https://mayeedwin.github.io/pwafire/)
>Build amazing Web experiences now with [PWA Fire](https://github.com/mayeedwin/pwafire). Github latest release version availabe [HERE](https://github.com/mayeedwin/pwafire/releases)
## Get Started with Project PWA Fire
Project [PWA Fire](https://twitter.com/pwafire) is an open source *progressive web app* **javascript** and **json** [Bundle](https://github.com/mayeedwin/pwafire) developed by [Maye Edwin](https://maye.gdgmoi.com) that allows you to convert your website into a *progressive web app* or build one in a few. It is the most simplest way you can ever convert your web app or website into a 100% [Progressive Web App](https://www.linkedin.com/pulse/what-progressive-web-app-get-started-now-canaan-maye-edwin/) and still have some fun with the code. It doesn't make you a lazy code beast.
## What to do first // Required
[Download](https://github.com/mayeedwin/pwafire/releases) now the [PWA Fire](https://twitter.com/pwafire) bundle and upload the *sw.js* and *manifest.json files* to the **ROOT** folder of your project or website.

Be sure to edit the *sw.js* and *manifest.json* file as in the guide provided below to fit your web app needs.

**N/B:** Do not configure or edit anything else but the one guided to.
## Configuration guide and notes
### 1. Code to register the service worker
This is the first step to making your web app work *offline.* Copy and paste this code to your *index file,* eg just before the end of the *body tag* or in the *head tag* in html5
### N/B : You need HTTPS
You can only register service workers on Websites, Web Apps or Pages served over HTTPS.

Read more about service workers [HERE](https://developers.google.com/web/fundamentals/primers/service-workers/)

```html
<!-- register service worker -->
	<script>
	
	    if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
    .then(function() { console.log("Service Worker Registered"); });
  }
  
  );
}
        </script>
		<!-- end of service worker -->
```
This code checks to see if the *service worker API* is available, and if it is, the service worker at */sw.js* is registered once the page is loaded.
### 2. Using the Web Manifest - manifest.json
When you have uploaded the *manifest* and it's on your site, add a link tag to all the pages that encompass your web app, as follows;
```html
<link rel="manifest" href="/manifest.json">
```
Configuring the **manifest.json** helps you to specify how you want your web app to look like when launched on the device.

Read more about Web Manifest [HERE](https://developers.google.com/web/fundamentals/web-app-manifest/)

## a) Service Worker // sw.js Guide
>Follow the steps as commented in the code below in order to correctly configure the *sw.js* file.
```javascript
//after a service worker is installed and the user navigates to a different page or refreshes, 
//the service worker will begin to receive fetch events
self.addEventListener('fetch', function(event) {
    event.respondWith(caches.open('cache').then(function(cache) {
        return cache.match(event.request).then(function(response) {
            console.log("cache request: " + event.request.url);
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
                
                // if we got a response from the cache, update the cache
                
                console.log("fetch completed: " + event.request.url, networkResponse);
                if (networkResponse) {
                    console.debug("updated cached page: " + event.request.url, networkResponse);
                    cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }, function (e) {
                
           // rejected promise - just ignore it, we're offline
                
           console.log("Error in fetch()", e);
           e.waitUntil(
           caches.open('cache').then(function(cache) { // our cache here is named *cache* in the caches.open()
           return cache.addAll([ //cache.addAll(), takes a list of URLs, then fetches them from the server and adds the response to the cache.
          // add your entire site to the cache- as in the code below; for offline access
          // If you have some build process for your site, perhaps that could generate the list of possible URLs that a user might load.
          '/', // do not remove this
          '/index.html', //default
          '/index.html?homescreen=1', //default
          '/?homescreen=1', //default
          '/assets/css/main.css',
               
          // Do not replace/delete/edit the sw.js/ and manifest.js paths below
          '/sw.js/',
          '/manifest.js',

          // These are links to the extenal social media buttons that should be cached if any exists.
         'https://platform.twitter.com/widgets.js',
         'https://platform.linkedin.com/badges/js/profile.js',
         'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11&appId=128193484441134',
         'https://buttons.github.io/buttons.js'
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
## b) Web Manifest // manifest.json Guide
>Follow the steps below as described in order to correctly configure the *manifest.json* file.
### // Add a link tag to all the pages that encompass your web app, as shown below;
```html
<!-- manifest  -->
// <link rel="manifest" href="/manifest.json">
<!-- end-manifest -->
```
### // Configuring manifest.json
Configure/edit the background and theme colors, display type, the Web App short name, the Web App name and icons size (keep icon sizes as **specified** below)

Leave the **start url** as recomended below though this can be anything you want; the value we're using has the advantage of being meaningful to **Google Analytics.**

**N/B** : For the **theme color**, specify that also in the index file/ pages to be cached. Example for html5 in the head tag, see below;
```html
<!-- theme-color -->
 <meta name="theme-color" content="#fff" />
<!-- end-theme-color -->
```
### The manifest.json code below;
```json
{
 "background_color": "#fff", 
 "display": "standalone",
 "theme_color": "#fff", 
    
  "short_name": "PWA Fire", 
  "name": "Your Web App Name",
  "icons": [
    {
      "src": "images/pwamayeedwin.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "images/pwamayeedwin.png", 
      "type": "image/png",
      "sizes": "96x96" 
    },
    {
      "src": "images/mayepwalogo192.png", 
      "type": "image/png",
      "sizes": "192x192" 
    }
    ,
    {
      "src": "images/mayepwa512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
    
  ],
  "start_url": "index.html?launcher=true"
}
```
## View Progressive Web Apps Built with Project PWA Fire
### 1. Impala Developers 
View the web app [HERE](https://impaladevelopers.com)
### 2. Project Maye Edwin PWA
View the web app [HERE](https://maye.gdgmoi.com)
### 3. Share Your Story
View the web app [HERE](https://share.gdgmoi.com)
## Join the conversation 
>Follow Project [PWA Fire](https://twitter.com/pwafire) on [Twitter](https://twitter.com/pwafire). Get Live Help on our [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI). 
## License
See the [LICENSE](https://github.com/mayeedwin/pwafire/blob/master/LICENSE) file.
## Support us 
Donate a star, like, follow and contribute in any way. Be sure to use **Project PWA Fire**. If you use the *pwafire_bundle*, kindly let us know via **mayedwine1@gmail.com** or JUST simply [Tweet us](https://twitter.com/pwafire).
