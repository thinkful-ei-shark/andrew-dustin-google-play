/*eslint-disable */ 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const playStore = require('./playstore')


console.log(playStore)
const app = express()

app.use(morgan('dev'))

app.use(cors())

app.get('/apps', handleGetApps)



const PORT = 8000

app.listen(PORT, () =>{
    console.log(`server listening at http://localhost:${PORT}`)
})