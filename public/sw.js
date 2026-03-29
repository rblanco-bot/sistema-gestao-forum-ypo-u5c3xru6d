const CACHE_NAME = 'ypo-forum-v1'
const urlsToCache = ['/', '/index.html', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
        .then(function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          var responseToCache = response.clone()
          caches.open(CACHE_NAME).then(function (cache) {
            if (event.request.url.startsWith('http')) {
              cache.put(event.request, responseToCache)
            }
          })
          return response
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }
        })
    }),
  )
})
