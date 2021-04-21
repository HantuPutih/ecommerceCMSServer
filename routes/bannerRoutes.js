const routes = require('express').Router()
const BannerController = require('../controllers/bannerController')
const authenticate = require('../middlewares/authenticate')
const authorizeBanner = require('../middlewares/authorizeBanner')


routes.get('/cust', BannerController.getAllBannerCust)
routes.use(authenticate)
routes.get('/', BannerController.getAllBanner)
routes.post('/', authorizeBanner, BannerController.addBanner)
routes.use("/:id", authorizeBanner)
routes.get('/:id', BannerController.findOneBanner)
routes.put('/:id', BannerController.putBanner)
routes.delete('/:id', BannerController.destroyBanner)



module.exports = routes