// Using workbox service worker : Learn : https://pwafire.org

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

// remember to set to fault on production
workbox.setConfig({
  debug: true
});
  
if (workbox) {
    console.log(`[ PWA Fire Bundle 🐹 ] Workbox is loaded`);
    workbox.precaching.precacheAndRoute([]);
    
   /* cache images in the e.g others folder; edit to other folders you got 
   and config in the sw-config.js file */
   workbox.routing.registerRoute(
    /(.*)others(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );
    /* Make your JS and CSS ⚡ fast by returning the assets from the cache, 
  while making sure they are updated in the background for the next use. */
  workbox.routing.registerRoute(
    // cache js, css, scc files 
    /.*\.(?:css|js|scss|)/,
    // use cache but update in the background ASAP
    new workbox.strategies.StaleWhileRevalidate({
      // use a custom cache name
      cacheName: 'assets',
    })
  );

   // cache google fonts
  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // add offline analytics 
  workbox.googleAnalytics.initialize(); 

/* publish a new service worker and have it update and
control a web page as soon as possible */
workbox.core.skipWaiting();
workbox.core.clientsClaim();
    
} else {
    console.log(`Oops! Workbox didn't load 👺`);
}

