self.addEventListener('message', function (event) {
  if (event.data.assets) {
    for (var url of event.data.assets) {
      self.toolbox.cache(url)
    }
  }
})

self.addEventListener('install', function (event) {
  return self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim())
})
