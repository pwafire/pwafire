// authored by Maye Edwin : https://twitter.com/MayeEdwin1
// Add offline properties, push notification, web share, web payments, etc
// pwafire 4.0.0
// Credits : 2018 Google Inc.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js')
  
if (workbox) {
    console.log(`Yay! Workbox is loaded ! Cheers to PWA Fire🎉`);
    workbox.precaching.precacheAndRoute([]);
} else {
    console.log(`Oops! Workbox didn't load 😬`);
}
