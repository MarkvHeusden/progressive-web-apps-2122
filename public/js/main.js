import { getCamera } from './barcodeDetector.js'

// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../serviceWorker.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
}

// Check if Barcode Detector is available, get camera on pages with video element
// Else, show no detector error
if ('BarcodeDetector' in window) {
    if (document.querySelector('video')) {
        getCamera(document.querySelector('video'))
    }
} else {
    if (window.location.pathname !== '/no-detector') {
        window.location.pathname = '/no-detector'
    }
}

// Add open/close function for detail pages
if (document.querySelector('.result')) {
    document.querySelector('.result').addEventListener('click', toggleDetails)
}

function toggleDetails() {
    this.classList.toggle('open')
}
