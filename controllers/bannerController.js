const { Banner } = require('../models/index')

class BannerController {
  static getAllBannerCust (req,res,next) {
    Banner.findAll({
      order: [['id', 'DESC']],
      where: {
        status: true
      }
    })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err => {
      err.from= 'getAllBanner BannerController'
      next(err)
    })
  }
  static getAllBanner (req,res,next) {
    Banner.findAll({order: [['id', 'DESC']]})
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err => {
      err.from= 'getAllBanner BannerController'
      next(err)
    })
  }
  static addBanner (req,res,next) {

    let newBanner = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }

    Banner.create(newBanner)
    .then(banner => {
      res.status(201).json(banner)
    })
    .catch(err => {
      err.from = 'addBanner BannerController'
      next(err)
    })
  }
  static findOneBanner (req,res,next) {
    Banner.findOne({
      where: {
        id: +req.params.id
      }
    }).then(banner => {
      if(!banner) throw {msg: "Banner not found!", status: 404}
      res.status(200).json(banner)
    }).catch(err => {
      err.from= 'findOneBanner BannerController'
      next(err)
    })

  }
  static putBanner (req,res,next) {
    let updatedBanner = {
      title: req.body.title,
      status: req.body.status,
      image_url: req.body.image_url
    }

    Banner.update(updatedBanner,{
      where: {
        id: +req.params.id
      }
    }).then(() => {
      res.status(200).json({msg: "Success edit banner"})
    }).catch(err => {
      err.from = 'putBanner BannerController'
      next(err)
    })
  }
  static destroyBanner (req,res,next) {
    Banner.destroy({
      where: {
        id: +req.params.id
      }
    }).then((banner) => {
      if(!banner) throw {msg: "Banner not found!", status: 404}
      res.status(200).json({msg: 'banner destroyed'})
    }).catch((err) => {
      err.from= 'destroyBanner BannerController'
      next(err)
    })
  }
}

module.exports = BannerController