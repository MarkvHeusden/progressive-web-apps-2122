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

app.get('/product/:barcode', async (req, res, next) => {
    getProductData(req.params.barcode)
        .then((productData) => res.render('product', { productData }))
        .catch(() => res.render('error'))
})

// function errorHandler(req, res, status) {
//     switch (status) {
//         case 'no-info':
//             res.render('error')
//             break

//         case 'no-detector':
//             break

//         default:
//             break
//     }
// }

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
