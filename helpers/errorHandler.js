module.exports = (err, req, res, next) => {

  if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError' ) { 
    const error = err.errors[0].message  
    res.status(400).json({error})
  }if (err.from == "login UserController") {
    const error = err.msg
    res.status(400).json({error})
  } else if(err.from == 'authorize middleware') {
    const error = err.msg
    if (err.msg == 'Unauthorized!') {
    res.status(401).json({error})
    } else {
      res.status(404).json({error})
    }
  } else if(err.from = 'addToCart' || err.from == 'patchCart') {
    let status = err.status || 500
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      res.status(status).json({msg: "internal server error"})
    } else {
      res.status(status).json({err})
    }
  } else {
    res.status(500).json({msg: "internal server error"}) //
  }
}