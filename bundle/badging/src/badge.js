```javascript

// In a web page
const unreadCount = 24;
window.Badge.set(unreadCount);

// In a service worker
self.addEventListener('sync', () => {
  self.Badge.set(getUnreadCount());
});


```
