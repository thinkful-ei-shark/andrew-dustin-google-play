/*eslint-disable */ 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


console.log(process.env.API_TOKEN)
const app = express()

app.use(morgan('dev'))

app.use(cors())