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
          }, function(event) {   
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
// Do not delete manifest.js path below
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

