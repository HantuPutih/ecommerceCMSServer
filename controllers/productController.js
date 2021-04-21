const { Product, Cart } = require('../models/index')

class ProductController {
  //customer
  static getAllProductsHome(req,res,next) {
    Product.findAll({
      where: {
        category: 'home'
      },
      order: [['id', 'DESC']]})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  static getAllProductsWork(req,res,next) {
    Product.findAll({
      where: {
        category: 'work'
      },
      order: [['id', 'DESC']]})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  static getAllProductsOthers(req,res,next) {
    Product.findAll({
      where: {
        category: 'other'
      },
      order: [['id', 'DESC']]})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  static getMyCart (req,res,next) {
    Cart.findAll({
      where: {
        UserId: +req.decoded.id
      },
      include: Product,
      attributes: ['id', 'UserId', 'ProductId', 'quantity'],
      order: [['id', 'DESC']]
    }).then(cartList => {
      // let cartList = data.map(el =>{
      //   return el.Product
      // })
      res.status(200).json({ cartList })
    }).catch(err => {
      err.from = 'getMyCart'
      console.log({ err })
      next(err)
    })
  }
  static addToCart (req,res,next) {
    Cart.findAll({
      attributes: ['id', 'UserId', 'ProductId', 'quantity'],
      where: {
        UserId: req.decoded.id
      },
      include: {
        model: Product,
        where: {id: +req.params.id}
      }
    })
    .then(data => {
      if(!data.length) {
        return Cart.create({
          UserId: +req.decoded.id,
          ProductId: +req.params.id,
          quantity: +req.body.quantity || 1,
        }) 
      } else if (data) {
        if (data[0].quantity >= data[0].Product.stock) {
          throw {msg: 'quantity exceeded product in stock', status: 400}
        } else {
          return Cart.increment({quantity: 1}, { 
            where: {
              id: data[0].id
            }
          })
        }
      }
    }).then(data => {
      if (Array.isArray(data)) {
        res.status(200).json({msg: 'Item already in cart, quantity updated'})
      } else {
        res.status(201).json({msg: 'Item added to cart'}) 
      }
    }).catch(err => {
      err.from = 'addToCart'
      next(err)
    })
  }
  static patchCart (req,res,next) {
    //findone productnnya dulu liat stocknya, validasi, baru udpate
    Cart.findOne({
      where: {
        id: +req.params.id
      },
      include: Product
    }).then(data => {
      if(req.body.quantity > data.Product.stock ) {
        throw {msg: 'quantity exceeded product in stock', status: 400}
      } else {
        return Cart.update({
          quantity: req.body.quantity
        }, {
          where: {id: req.params.id}
        })
        
      }
    }).then(()=>{
      res.status(200).json({msg: 'success patchCart'})
    })
    .catch(err => {
      err.from = 'patchCart'
      next(err)

    })
  }
  static deleteCart (req,res,next) {
    Cart.destroy({
      where: {id: req.params.id
      }})
    .then(data =>{
      res.status(200).json({msg: "product in cart deleted"})
    }).catch(err => {
      err.from = 'deleteCart'
      next(err)
    })
  }

  //admin
  static getAllProducts(req,res,next) {
    Product.findAll({order: [['id', 'DESC']]})
    .then(data =>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }
  static addProduct(req,res,next) {
    let newProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      category: req.body.category,
      price: +req.body.price,
      stock: +req.body.stock,
    }
    Product.create(newProduct)
    .then(task=>{
      res.status(201).json(task)
    })
    .catch(err=>{
      err.from = "addProduct ProductController"

      next(err)
    })
  }
  static findOneProduct(req,res,next) {
    Product.findByPk(+req.params.id)
    .then(product=>{
      if(!product) throw {msg: "Product not found!", status: 404}
      res.status(200).json(product)
    })
    .catch(err=>{
      err.from = "findOneProduct ProductController"
      next(err)
    })
  }
  static putProduct(req,res,next) {
    let editProduct = {
      name: req.body.name,
      image_url: req.body.image_url,
      category: req.body.category,
      price: +req.body.price,
      stock: +req.body.stock,
    }

    Product.update(editProduct,
      {where:{id: +req.params.id}
    })
    .then(data=>{
      if(!data) throw {msg: "Product not found!", status: 404}
      res.status(200).json({msg: "Success edit product"})
    })
    .catch(err=>{
      err.from = "putProduct ProductController"

      next(err)
    })
  }
  static destroyProduct(req,res,next) {
    Product.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(task=>{
      if(!task) throw {msg: "Product not found!", status: 404}
      res.status(200).json({msg: "Product deleted successfully!"})
    })
    .catch(err=>{
      err.from = "destroyProduct ProductController"

      next(err)
    })
  }
}

module.exports = ProductController