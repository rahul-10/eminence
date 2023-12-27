
const express = require('express')
const app = express()
require('./configs/db.config.js')
const routes = require('./routers')

app.use(express.json())

process.on('uncaughtException', function (err) {
    console.error('uncaughtException: ', err)
})


app.use('/', routes)
app.get('/', function (req, res) { res.send('OK') })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => { console.log('Server stated at port', PORT) })