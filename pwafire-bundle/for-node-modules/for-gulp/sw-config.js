// The importScripts call imports the workbox-sw.js
// library from a Content Delivery Network (CDN).

// Once the library is loaded, the workbox object gives our
// service worker access to all the Workbox modules. 

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
console.log(`Yay! PWA Fire with Workbox is loaded 🎉`);

// The precacheAndRoute method of the precaching module takes a precache
// "manifest" (a list of file URLs with "revision hashes")
// to cache on service worker installation. 

workbox.precaching.precacheAndRoute([]);
 } else {
 console.log(`Oops! PWA Fire with Workbox didn't load 😬`);
 }