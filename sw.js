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
    caches.open('cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
          '/index.html?homescreen=1',
       '/?homescreen=1',
        '/assets/css/main.css',
        '/assets/css/font-awesome.min.css',
        '/assets/css/ie8.css',
        '/assets/js/jquery.dropotron.min.js',
          '/assets/js/jquery.min.js',
            '/assets/js/jquery.scrollgress.min.js',
              '/assets/js/main.js',
                '/assets/js/skel.min.js',
                  '/assets/js/util.js',
                  '/assets/js/ie/backgroundsize.min.htc',
                  '/assets/js/ie/html5shiv.js',
                  '/assets/js/ie/PIE.htc',
                  '/assets/js/ie/respond.min.js',
        '/assets/fonts/',
        '/assets/sass/',
        '/images/gdgmaye.JPG',
        '/images/mayepwa.jpg',
        '/images/mayepwa192.png',
        '/images/pwamayeedwin',
        '/images/ssagdgmaye.JPG',
         '/images/techmayemean.jpg',
         '/images/devfestriftvalley2017maye.png',
         '/images/microsft4afrikainternsmayee.png',
         
        '/sw.js/',
        '/manifest.js',
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