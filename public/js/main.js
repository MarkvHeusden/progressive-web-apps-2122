// Add service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../serviceWorker.js')
}

// Check if Barcode Detector is available, get camera on pages with video element
// Else, show no detector error
if (document.querySelector('video')) {
    const videoEl = document.querySelector('video')
    if ('BarcodeDetector' in window) {
        videoEl.style.display = 'block'
        getCamera(videoEl)
    }
}

// Add open/close function for detail pages
if (document.querySelector('.result')) {
    document.querySelector('.result').addEventListener('click', toggleDetails)
}

async function getCamera(video) {
    const camera = await navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: {
                ideal: 'environment',
            },
        },
        audio: false,
    })
    video.srcObject = camera
    await video.play()

    detectBarcode(video)
}

function detectBarcode(video) {
    const barcodeDetector = new BarcodeDetector({ formats: ['ean_13'] })

    window.setInterval(async () => {
        const barcodes = await barcodeDetector.detect(video)
        if (barcodes.length <= 0) {
            return
        } else {
            window.location.pathname = 'product/' + barcodes[0].rawValue

            const detailsEl = document.querySelector('.details')
            detailsEl.innerHTML = `
            <h1>Product info ophalen...</h1>
            <img src="../img/spinner.gif" />
            `
        }
    }, 1000)
}

function toggleDetails() {
    this.classList.toggle('open')
}
