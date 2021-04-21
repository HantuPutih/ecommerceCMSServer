const { Product } = require('../models/index')

function authorize(req,res,next) {
  try {
    if (req.decoded.role === "admin"){
      next()
    } else {
      throw {msg: "Unauthorized!", from: "authorize middleware"}
    }
  } catch (err) {
    next(err)
  }
  
  
}

module.exports = authorize