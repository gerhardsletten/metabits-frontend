importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.routing.registerRoute(
 /^https?.*/,
 self.workbox.strategies.networkFirst()
);

self.addEventListener('message', function (event) {
  if (event.data.assets) {
    caches.open(self.workbox.core.cacheNames.runtime).then(cache => {
      cache.addAll(event.data.assets)
   });
  }
});
