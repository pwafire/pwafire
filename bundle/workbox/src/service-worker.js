
// authored by Maye Edwin : https://twitter.com/MayeEdwin1
// Add offline properties, push notification, web share, web payments, etc
// pwafire 4.0.0

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');
  
if (workbox) {
    console.log(`Yay! Workbox is loaded ! Cheers to PWA Fire 🐹`);
    workbox.precaching.precacheAndRoute([]);
    
   /*  cache images in the e.g others folder; edit to other folders you got 
   and config in the sw-config.js file
    */
   workbox.routing.registerRoute(
    /(.*)others(.*)\.(?:png|gif|jpg)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        })
      ]
    })
  );
    /* Make your JS and CSS ⚡ fast by returning the assets from the cache, 
  while making sure they are updated in the background for the next use.
  */
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

/* Install a new service worker and have it update 
and control a web page as soon as possible
*/

workbox.core.skipWaiting();
workbox.core.clientsClaim();
    
} else {
    console.log(`Oops! Workbox didn't load 👺`);
}

