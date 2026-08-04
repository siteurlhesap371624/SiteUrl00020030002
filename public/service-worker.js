self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map((n) => caches.delete(n)))
        await self.registration.unregister()
        const clients = await self.clients.matchAll({ type: 'window' })
        for (const client of clients) {
          try {
            client.navigate(client.url)
          } catch {
            client.postMessage({ type: 'sw-unregister-reload' })
          }
        }
      } catch {
        return
      }
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request))
})
