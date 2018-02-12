self.addEventListener('message', function (event) {
  console.log('Handling message event:', event.data, self.toolbox)
  if (event.data.assets) {
    for (var url of event.data.assets) {
      console.log(url)
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
