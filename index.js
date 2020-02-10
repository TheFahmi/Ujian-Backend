const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.status(200).send('<h1>Welcome to API</h1>')
})

const { movieRouters, categoryRouters, MovCatRouters } = require('./routers')

app.use('/movie', movieRouters)
app.use('/category', categoryRouters)
app.use('/movcat', MovCatRouters)


app.listen(port, ()=> console.log(`API aktif di port ${port}`))