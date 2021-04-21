const {verify} = require('../helpers/jwt')

function authenticateCustomer(req,res,next) {
  try {
    let access_token = req.headers.access_token
    let decoded = verify(access_token)
    
    req.decoded = decoded
    
    next()
  } catch (error) {
    res.status(401).json({error})
  }
}

module.exports = authenticateCustomer