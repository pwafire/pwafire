## [Project PWA Fire](https://pwafire.org)

Build your first progressive web app with [PWA Fire Bundle](https://pwafire.org/developer/pwa/codelab/). Github latest release version [availabe here](https://github.com/mayeedwin/pwafire/releases). This is version 3.0 with a Guide to building production ready service workers for node-modules; npm, gulp and webpack! Get [started here](https://pwafire.org/developer/pwa/started/) and on [github here](https://github.com/mayeedwin/pwafire/tree/for-node-modules).
	
### Get Started with PWA Fire
Project [PWA Fire](https://twitter.com/pwafire) is an open source [Progressive Web App](https://www.linkedin.com/pulse/what-progressive-web-app-get-started-now-canaan-maye-edwin/) **javascript** and **json** [Bundle](https://github.com/mayeedwin/pwafire/tree/master/pwafire-bundle) made by [Maye Edwin](https://maye.gdgmoi.com) that allows you to convert your website into a [Progressive Web App](https://www.linkedin.com/pulse/what-progressive-web-app-get-started-now-canaan-maye-edwin/) or build one in a few. 

It is the most simplest way you can ever convert your web app or website into a 100% [Progressive Web App](https://www.linkedin.com/pulse/what-progressive-web-app-get-started-now-canaan-maye-edwin/) and still have some fun with the code. It doesn't make you a lazy code beast.

[![PWA Fire Logo](https://github.com/mayeedwin/pwafire/blob/master/_layouts/pwafirebannerlogo.png)](https://pwafire.org)
### What to do first // Required
[Download](https://github.com/mayeedwin/pwafire/archive/master.zip) PWA Fire and from [pwafire-bundle](https://github.com/mayeedwin/pwafire/tree/master/pwafire-bundle) folder, upload the *sw.js* and *manifest.json files* to the **ROOT** folder of your project or website.

Be sure to edit the *sw.js* and *manifest.json* file as in the guide provided below to fit your web app needs.

**N/B:** Do not configure or edit anything else but the one guided to.

### Configuration guide
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
    navigator.serviceWorker.register('/sw.js')
    .then(function() { console.log("Service Worker Registered"); });
  }
  
  );
}
        </script>
		<!-- end of service worker -->
```
This code checks to see if the *service worker API* is available, and if it is, the service worker at */sw.js* is registered once the page is loaded.

#### 2. Using the Web Manifest - manifest.json
When you have uploaded the *manifest* and it's on your site, add a link tag to all the pages that encompass your web app, as follows;
```html
<link rel="manifest" href="/manifest.json">
```
Configuring the **manifest.json** helps you to specify how you want your web app to look like when launched on the device.

Read more about Web Manifest [HERE](https://developers.google.com/web/fundamentals/web-app-manifest/)

### a) Service Worker // sw.js Guide
>Follow the steps as commented in the code below in order to correctly configure the *sw.js* file.

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
### b) Web Manifest // manifest.json Guide
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
### Features // Roadmap
1. Offline Capabilities and Add to Homescreen (Done!) 

2. Push notification add-on (In progress)

3. [Web Manifest](https://pwafire.org/developer/tools/get-manifest/) [Generator](https://pwafire.org/developer/tools/get-manifest/) tool (Released in May 2018!)

4. Propose your Feature by [Creating an Issue](https://github.com/mayeedwin/pwafire/issues/new)

### View Progressive Web Apps Built with Project PWA Fire

| Progressive Web App | Web App Link |
| --- | --- |
| Project Maye PWA | [View Now](https://maye.gdgmoi.com) |
| PWAFire.Org | [View Now](https://pwafire.org) |
| GDG Eldoret | [View Now](https://gdgmoi.com) |
| GDG Kenya | [View Now](https://gdgkenya.org) |
| GDG Jalandhar | [View Now](https://gdgjalandhar.com) |
| I/O Extended Eldoret | [View Now](https://io.gdgmoi.com) |

### Join the conversation 
Follow Project [PWA Fire](https://twitter.com/pwafire) on [Twitter](https://twitter.com/pwafire). Get Live Help on our [Slack Workspace](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI). 

| Communication Channel | Talk to us |
| --- | --- |
| Live Twitter Chat | [Tweet us](https://twitter.com/pwafire) |
| Slack Workspace | [Join Workspace](http://bit.ly/2oPNK7S) |

### License
| License |License url |
| --- | --- |
| MIT License | [View License](https://github.com/mayeedwin/faq-beta/blob/master/LICENSE) |

### Support us 
Donate a star, like, follow and contribute in any way. Be sure to use **Project PWA Fire**. If you use [PWA Fire](https://pwafire.org/developer), kindly let us know via **info@pwafire.org** | **mayedwine1@gmail.com** or JUST simply [Tweet us](https://twitter.com/pwafire).
