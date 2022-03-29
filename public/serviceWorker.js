const staticCache = 'site-static'
const dynamicCache = 'site-dynamic'
const staticAssets = [
    '/',
    '/js/main.js',
    '/js/barcodeDetector.js',
    '/css/remedy.css',
    '/css/style.css',
    'manifest.json',
    // '/img/barcode.png',
    '/img/warn.svg',
    '/img/error.svg',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Poppins:wght@700&display=swap',
]

// Install event
self.addEventListener('install', (event) => {
    // Open/create new static cache
    event.waitUntil(
        caches.open(staticCache).then((cache) => {
            cache.addAll(staticAssets)
        }),
    )
})

// Activate event
self.addEventListener('activate', (event) => {
    // Delete old cache
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter((key) => key !== staticCache && key !== dynamicCache).map((key) => caches.delete(key)))
            // return Promise.resolve(
            //     keys.forEach((key) => {
            //         if (key !== staticCache) {
            //             caches.delete(key)
            //         }
            //     }),
            // )
        }),
    )
})

// Fetch event

self.addEventListener('fetch', (event) => {
    // Check stored cache before requesting new data, then save new data
    event.respondWith(
        caches.match(event.request).then((cacheResponse) => {
            return (
                cacheResponse ||
                fetch(event.request).then((fetchResponse) => {
                    return caches.open(dynamicCache).then((cache) => {
                        cache.put(event.request.url, fetchResponse.clone())
                        return fetchResponse
                    })
                })
            )
        }),
    )
})
