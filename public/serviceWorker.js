const staticCache = 'site-static-v2'
const dynamicCache = 'site-dynamic-v2'
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
    '/img/barcode.png',
    'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Poppins:wght@700&display=swap',
    'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1x4gaVQUwaEQbjA.woff',
    'https://fonts.gstatic.com/s/poppins/v19/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
]

// Install event
self.addEventListener('install', (event) => {
    console.log('sw installed')
    // Open/create new static cache
    event.waitUntil(
        caches
            .open(staticCache)
            .then((cache) => {
                cache.addAll(staticAssets)
            })
            .then(() => self.skipWaiting()),
    )
})

// Activate event
self.addEventListener('activate', (event) => {
    // Delete old cache
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => {
                        return key !== staticCache && key !== dynamicCache
                    })
                    .map((key) => {
                        return caches.delete(key)
                    }),
            )
        }),
    )
    event.waitUntil(clients.claim())
})

// Fetch event
self.addEventListener('fetch', (event) => {
    // console.log(event.request.url)
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
                        console.log('fs = ', fetchResponse)
                        // Save new data in dynamic cache
                        caches.open(dynamicCache).then((cache) => {
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

    // event.respondWith(
    //     (async () => {
    //         const cachedResponse = await caches.match(event.request)
    //         if (cachedResponse) {
    //             return cachedResponse
    //         }

    //         const response = await fetch(event.request)
    //         console.log('response;', response)
    //         if (response) {
    //             console.log('geen respons')
    //             return response
    //         } else {
    //             return caches.open(staticCache).then((cache) => cache.match('/offline'))
    //         }

    // if (dynamicCache) {
    //     const cache = await caches.open(dynamicCache)
    //     await cache.put(event.request, response.clone())
    // }
    // return response
    //     })(),
    // )
})

// event.respondWith(
//     (async () => {
//         const cachedResponse = await caches.match(event.request)
//         if (cachedResponse) {
//             return cachedResponse
//         }

//         await fetch(event.request)
//             .then((fetchResponse) => {
//                 console.log('fs = ', fetchResponse)
//                 // Save new data in dynamic cache
//                 caches.open(dynamicCache).then((cache) => {
//                     cache.put(event.request.url, fetchResponse.clone())
//                     return fetchResponse
//                 })
//             })
//             .catch(() => {
//                 // Show offline page if fetch failed
//                 return caches.open(staticCache).then((cache) => cache.match('/offline'))
//             })

// const fetchResponse = await fetch(event.request)

// if (fetchResponse) {
//     console.log('fs = ', fetchResponse)
//     // Save new data in dynamic cache
//     caches.open(dynamicCache).then((cache) => {
//         cache.put(event.request.url, fetchResponse.clone())
//         return fetchResponse
//     })
// } else {
//     // Show offline page if fetch failed
//     return caches.open(staticCache).then((cache) => cache.match('/offline'))
// }

// return fetchResponse
// })(),
// )
