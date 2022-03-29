import express from 'express'
import getProductData from './controllers/getData.js'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/scanning', (req, res) => {
    res.render('scanning')
})

app.get('/product/:barcode', async (req, res) => {
    getProductData(req.params.barcode)
        .then((productData) => res.render('product', { productData }))
        .catch((status) => res.render('error', { error: status }))
})

app.get('/offline', (req, res) => {
    res.render('error', { error: 'offline' })
})

app.get('/no-detector', (req, res) => {
    res.render('error', { error: 'no-detector' })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
