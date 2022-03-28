import { getCamera } from './modules/barcodeDetector.js'

if (document.querySelector('video')) {
    getCamera(document.querySelector('video'))
}

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
