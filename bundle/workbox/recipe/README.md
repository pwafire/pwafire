## Force a Timeout on Network Requests

Best for network requests that would be beneficial if they were served from the network, but could benefit by being served by the cache if the network request is taking too long. Use a `NetworkFirst` strategy with the `networkTimeoutSeconds` 
option configured.

```javascript

workbox.routing.registerRoute(
  'https://hacker-news.firebaseio.com/v0/api',
  new workbox.strategies.NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: 'stories',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        }),
      ],
  })
);

```
