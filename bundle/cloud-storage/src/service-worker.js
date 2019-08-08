// cache all your google cloud storage resources
workbox.routing.registerRoute(
        new RegExp('.+/firebasestorage.googleapis.com/+'),
        new workbox.strategies.CacheFirst({
            cacheName: 'Cloud',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 7,
                }),
            ]
        }),
    );
