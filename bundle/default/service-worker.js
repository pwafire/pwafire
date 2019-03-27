        /* PWA Fire Bundle, url : https://www.pwafire.org      
           after a service worker is installed and the user navigates to a different page or 
           refreshes,the service worker will begin to receive fetch events */
                    
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
                  caches.open('cache').then(function(cache) { 
        // our cache is named *cache* in the caches.open() above
                  return cache.addAll
                  ([            
        //cache.addAll(), takes a list of URLs, then fetches them from the server
        // and adds the response to the cache.           
        // add your entire site to the cache- as in the code below; for offline access
        // If you have some build process for your site, perhaps that could 
        // generate the list of possible URLs that a user might load.               
                '/', // do not remove this
                '/index.html', //default
                '/index.html?homescreen=1', //default
                '/?homescreen=1', //default
                '/assets/css/main.css',// configure as by your site ; just an example
                '/images/*',// choose images to keep offline; just an example
        // Do not replace/delete/edit manifest.js paths below
                '/manifest.js',
        //These are links to the extenal social media buttons that should be cached;
        // we have used twitter's as an example
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
      
        self.addEventListener('install', function(event) {
          // The promise that skipWaiting() returns can be safely ignored.
          self.skipWaiting();
          console.log("Latest version installed!");
        });
