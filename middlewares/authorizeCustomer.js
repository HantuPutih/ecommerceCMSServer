// berhak atau engga buat ngapus/update item tsb
const { Cart } = require('../models/index')

function authorize(req,res,next) {
  Cart.findOne({
    where: {
      id: +req.params.id
    }
  })
  .then(cart => {
    if(!cart) throw {msg: "Cart not found!", status: 404}
    if (+cart.UserId == +req.decoded.id) {
      next()
    } else {
      throw {msg: "Unauthorized!", status: 401}
    }
  })
  .catch(err=>{
    err.from = "authorize middleware"
    next(err)
  })
}

module.exports = authorize