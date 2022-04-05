const staticCache = 'site-static-v1'
const dynamicCache = 'site-dynamic-v1'
const staticAssets = [
    '/',
    '/offline',
    '/js/main.js',
    '/js/barcodeDetector.js',
    '/css/style.css',
    '/manifest.json',
    '/img/spinner.gif',
    '/img/warn.svg',
    '/img/error.svg',
    '/img/search.svg',
    '/img/barcode.png',
    'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVQUwaEQbjA.woff',
    'https://fonts.gstatic.com/s/poppins/v19/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
]

// Install event
self.addEventListener('install', (event) => {
    // Open/create new static cache
    event.waitUntil(
        caches
            .open(staticCache)
            .then((cache) => cache.addAll(staticAssets))
            .then(() => self.skipWaiting()),
    )
})

// Activate event
self.addEventListener('activate', (event) => {
    // Delete old cache
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter((key) => key !== staticCache && key !== dynamicCache).map((key) => caches.delete(key)))
        }),
    )
    event.waitUntil(clients.claim())
})

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        // Check if requested data is already in cache
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // If it is, use cached data
                return cachedResponse
            } else {
                // Else fetch the new data
                return fetch(event.request)
                    .then((fetchResponse) => {
                        // Save new data in dynamic cache
                        return caches.open(dynamicCache).then((cache) => {
                            cache.put(event.request.url, fetchResponse.clone())
                            return fetchResponse
                        })
                    })
                    .catch(() => {
                        // Show offline page if fetch failed
                        return caches.open(staticCache).then((cache) => cache.match('/offline'))
                    })
            }
        }),
    )
})
