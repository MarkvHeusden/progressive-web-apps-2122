const staticCache = 'site-static'
const dynamicCache = 'site-dynamic'
const staticAssets = [
    '/',
    '/offline',
    '/js/main.js',
    '/js/barcodeDetector.js',
    '/css/remedy.css',
    '/css/style.css',
    '/manifest.json',
    '/img/spinner.gif',
    '/img/warn.svg',
    '/img/error.svg',
    '/img/search.svg',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Poppins:wght@700&display=swap',
    'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVQUwaEQbjA.woff',
    'https://fonts.gstatic.com/s/poppins/v19/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
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
    console.log('Fetching:' + event.request.url)

    // show cached request from cache
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse
            } else {
                return fetch(event.request)
                    .then((fetchRes) => fetchRes)
                    .catch(() => {
                        return caches.open(staticCache).then((cache) => cache.match('/offline'))
                    })
            }
        }),
    )

    // Check stored cache before requesting new data, then save new data
    // event.respondWith(
    //     caches
    //         .match(event.request)
    //         .then((cacheResponse) => {
    //             return (
    //                 cacheResponse ||
    //                 fetch(event.request).then((fetchResponse) => {
    //                     return caches.open(dynamicCache).then((cache) => {
    //                         cache.put(event.request.url, fetchResponse.clone())
    //                         return fetchResponse
    //                     })
    //                 })
    //             )
    //         })
    //         .catch(() => {
    //             return caches.match('/offline')
    //         }),
    // )
})
