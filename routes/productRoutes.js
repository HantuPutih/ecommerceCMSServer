const routes = require('express').Router()
const ProductController = require('../controllers/productController')
const authenticateAdmin = require('../middlewares/authenticate')
const authorizeAdmin = require('../middlewares/authorize')
const authenticateCustomer = require('../middlewares/authenticateCustomer')
const authorizeCustomer = require('../middlewares/authorizeCustomer')

//customer
routes.get('/customer/home', ProductController.getAllProductsHome)
routes.get('/customer/work', ProductController.getAllProductsWork)
routes.get('/customer/other', ProductController.getAllProductsOthers)

routes.get('/customer/mycart', authenticateCustomer, ProductController.getMyCart)
routes.post('/customer/:id', authenticateCustomer, ProductController.addToCart)
routes.patch('/customer/:id', authenticateCustomer, authorizeCustomer, ProductController.patchCart)
routes.delete('/customer/:id', authenticateCustomer, authorizeCustomer, ProductController.deleteCart)



//admin
routes.use(authenticateAdmin)
routes.get('/', authorizeAdmin,ProductController.getAllProducts)
routes.post('/', authorizeAdmin, ProductController.addProduct)
routes.use("/:id", authorizeAdmin)
routes.get('/:id', ProductController.findOneProduct)
routes.put('/:id', ProductController.putProduct)
routes.delete('/:id', ProductController.destroyProduct)

module.exports = routes