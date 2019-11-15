self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('video-store').then(function (cache) {
      return cache.addAll([
        '/indexed-db-video-store/',
        '/indexed-db-video-store/index.html',
        '/indexed-db-video-store/index.js',
        '/indexed-db-video-store/style.css'
      ])
    })
  )
})

// Add listener for fetch requests and serve assets from cache if found. Cached assets can be served in offline mode
self.addEventListener('fetch', (event) => {
  console.log('New fetch request.', event.request.url)
  event.respondWith(
    caches.match(event.request).then((response) => {
      // response have the cached asset. If response is falsy, fetch asset from server
      return response || fetch(event.request)
    })
  )
})
