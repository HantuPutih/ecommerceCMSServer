const routes = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const bannerRoutes = require('./bannerRoutes')

routes.use('/user', userRoutes)

routes.use('/product', productRoutes)

routes.use('/banner', bannerRoutes)

module.exports = routes