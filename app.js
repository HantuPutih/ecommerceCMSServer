let env = process.env.NODE_ENV
if (env !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require("cors")
const routes = require('./routes/index')
const errorHandler = require('./helpers/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)

app.use(errorHandler)

module.exports = app

