// importScripts call imports the workbox-sw.js library from a Content Delivery Network (CDN).
// Once the library is loaded, the workbox object gives our service worker access to all the Workbox modules.

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}