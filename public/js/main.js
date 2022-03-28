import { getCamera } from './barcodeDetector.js'

// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../serviceWorker.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
}

// Get user camera
if (document.querySelector('video')) {
    getCamera(document.querySelector('video'))
}

// Add open/close function for detail pages
if (document.querySelector('.result')) {
    document.querySelector('.result').addEventListener('click', toggleDetails)
}

function toggleDetails() {
    this.classList.toggle('open')
}

// Check if Barcode Detector is available
// if (!('BarcodeDetector' in window)) {
//     showState('no-detector')
// }
