const { User } = require('../models/index')
let {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class UserController{ 
  static register (req,res,next) {
    let registUser = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'customer'
    }
    User.create(registUser)
    .then(data => {
      let newUser = {
        id: data.id,
        email: data.email,
        role: data.role
      }
      res.status(201).json(newUser)
    })
    .catch(err=>{
      err.from = "register UserController"

      next(err)
    })
  }
  static login (req,res,next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(data => {
      if(!data) throw {msg: "invalid email/password"}
      if(data.role === 'customer') throw {msg: "Unauthorized!"}
      const comparedPass = comparePass(req.body.password, data.password)
      if(!comparedPass) throw {msg: "invalid email/password"}
      let access_token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role
      })
      res.status(200).json({access_token})
    })
    .catch(err=>{
      err.from = "login UserController"

      next(err)
    })
  }
  static loginCustomer (req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(data => {
      if(!data) throw {msg: "invalid email/password"}
      // if(data.role === 'customer') throw {msg: "Unauthorized!"}
      const comparedPass = comparePass(req.body.password, data.password)
      if(!comparedPass) throw {msg: "invalid email/password"}
      let access_token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role
      })
      res.status(200).json({access_token})
    })
    .catch(err=>{
      err.from = "login UserController"
      console.log({ err })
      next(err)
    })
  }
}

module.exports = UserController