const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/hoi', (req, res) => {
    res.send('hoi')
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
