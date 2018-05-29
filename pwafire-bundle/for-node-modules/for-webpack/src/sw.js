importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');
if (workbox) {
console.log(`Yay! PWA Fire with Workbox is loaded 🎉`);
workbox.precaching.precacheAndRoute([]);
 } else {
 console.log(`Oops! PWA Fire with Workbox didn't load 😬`);
 }