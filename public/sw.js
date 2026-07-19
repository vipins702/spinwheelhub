// Minimal service worker — enables "Add to Home Screen" / installability
// and a fast network-first load. Intentionally light: no aggressive caching
// so users always get the latest wheel.
const CACHE = 'swh-v1'

self.addEventListener('install', (event) => {
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
    )
    self.clients.claim()
})

self.addEventListener('fetch', (event) => {
    const req = event.request
    if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return
    // Network-first, fall back to cache when offline.
    event.respondWith(
        fetch(req)
            .then((res) => {
                const copy = res.clone()
                caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => { })
                return res
            })
            .catch(() => caches.match(req))
    )
})
