import express from 'express'
import getProductData from './controllers/getData.js'
import compression from 'compression'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(compression())

app.use(/.*-[0-9a-f]{10}\..*/, (req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=365000000, immutable')
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/scanning', (req, res) => {
    res.render('scanning')
})

app.get('/product/:barcode', (req, res) => {
    getProductData(req.params.barcode)
        .then((productData) => res.render('product', { productData }))
        .catch((status) => res.render('error', { error: status }))
})

app.post(['/scanning', '/product/:barcode'], (req, res) => {
    res.redirect('/product/' + req.body.searchBar)
})

app.get('/offline', (req, res) => {
    res.render('error', { error: 'offline' })
})

// app.get('/no-detector', (req, res) => {
//     res.render('error', { error: 'no-detector' })
// })

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
