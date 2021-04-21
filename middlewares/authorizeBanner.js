const { Banner } = require('../models/index')

function authorizeBanner(req,res,next) {
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

module.exports = authorizeBanner