const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const {Product} =require('../models/index')

//create product

let access_token = undefined
let cust_access_token = undefined
let id = undefined

beforeAll((done)=> {
  let body ={
    email: "admin@mail.com",
    password: "1234"
  }
  request(app)
  .post('/user/login')
  .send(body)
  .end((err, res) => { 
    if (err) {
      done()
    }
    access_token = res.body
  })

  let cust = {
    email: 'customer@mail.com',
    password: '1234'
  }
  request(app)
  .post('/user/login')
  .send(cust)
  .end((err, res) => { 
    if (err) {
      done()
    }
    cust_access_token = res.body
    done()
  })
})



describe('POST /product success add products', ()=> {
  it('should return status 201 with new data',(done)=> {
    let body = {
      name: 'wawawukwuk',
      image_url: 'http://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-7fc6-4b58-8b3f-6d05cef0369c_600x600.png?v=1610061677',
      category: 'home',
      price: 5000,
      stock: 1,
      UserId: 1
    }
    request(app)
    .post('/product')
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      id = res.body.id
      expect(res.status).toEqual(201)
      expect(typeof res.body).toEqual('object')
      expect(typeof res.body.id).toEqual('number')
      expect(typeof res.body.image_url).toEqual('string')
      expect(typeof res.body.category).toEqual('string')
      expect(typeof res.body.price).toEqual('number')
      expect(typeof res.body.stock).toEqual('number')
      expect(typeof res.body.UserId).toEqual('number')

      expect(res.body).toHaveProperty('id')
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('image_url')
      expect(res.body).toHaveProperty('category')
      expect(res.body).toHaveProperty('price')
      expect(res.body).toHaveProperty('stock')
      expect(res.body).toHaveProperty('UserId')
      expect(res.body).toHaveProperty('createdAt')
      expect(res.body).toHaveProperty('updatedAt')
      
      expect(res.body.name).toEqual(body.name)
      expect(res.body.image_url).toEqual(body.image_url)
      expect(res.body.category).toEqual(body.category)
      expect(res.body.price).toEqual(body.price)
      expect(res.body.stock).toEqual(body.stock)
      expect(res.body.UserId).toEqual(body.UserId)
      expect(typeof res.body.createdAt).toEqual('string')
      expect(typeof res.body.updatedAt).toEqual('string')

      done()
    })

  })
})

describe('GET /product get all products', ()=> {
  it('should return status 200 with data', (done)=> {
    let body = 
    [
      {
        "name": "sol sepatu",
        "image_url": "<img link>",
        "category": "home",
        "price": 20000,
        "stock": 2,
        "UserId": 1,
        "createdAt": "2021-02-12T09:10:07.538Z",
        "updatedAt": "2021-02-12T09:12:13.723Z"
      },
    ]
    request(app)
    .get('/product')
    .set(access_token)
    .end((err, res) => {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(200)
      expect(Array.isArray(res.body)).toEqual(true)
      expect(res.body[0]).toHaveProperty('id')
      expect(res.body[0]).toHaveProperty('name')
      expect(res.body[0]).toHaveProperty('image_url')
      expect(res.body[0]).toHaveProperty('category')
      expect(res.body[0]).toHaveProperty('price')
      expect(res.body[0]).toHaveProperty('stock')
      expect(res.body[0]).toHaveProperty('UserId')
      expect(res.body[0]).toHaveProperty('createdAt')
      expect(res.body[0]).toHaveProperty('updatedAt')
      expect(typeof res.body[0].name).toEqual('string')
      expect(typeof res.body[0].image_url).toEqual('string')
      expect(typeof res.body[0].category).toEqual('string')
      expect(typeof res.body[0].price).toEqual('number')
      expect(typeof res.body[0].stock).toEqual('number')
      expect(typeof res.body[0].UserId).toEqual('number')
      expect(typeof res.body[0].createdAt).toEqual('string')
      expect(typeof res.body[0].updatedAt).toEqual('string')

      done()

    })
  })
})

//create fail
describe('POST /product add products no access_token', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "sol",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 5000,
      stock: 1,
      UserId: 1
    }

    request(app)
    .post('/product')
    .send(body)
    // .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body).toEqual({
        "error": {
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }
      })
      done()
    })

  })
})


describe('POST /product add products not admin access_token', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "sol",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 5000,
      stock: 1,
      UserId: 1
    }

    request(app)
    .post('/product')
    .send(body)
    .set(cust_access_token) //not admin
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "Unauthorized!",
      })
      done()
    })

  })
})


describe('POST /product add products empty required field', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "",
      image_url: '',
      category: "",
      price: null,
      stock: null,
      UserId: null
    }

    request(app)
    .post('/product')
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      done()
    })

  })
})

describe('POST /product add products negative stocks', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 5000,
      stock: -1,
      UserId: 1
    }

    request(app)
    .post('/product')
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      expect(res.body).toEqual({
        "error": "stock cannot be negative"
    })
      done()
    })

  })
})

describe('POST /product add product negative price', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: -5000,
      stock: 1,
      UserId: 1
    }

    request(app)
    .post('/product')
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      expect(res.body).toEqual({
        "error": "price cannot be negative"
    })
      done()
    })

  })
})

describe('POST /product add product wrong data type', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: "FiFtyThouSAND DOllAS",
      stock: "wan dollas",
      UserId: 1
    }

    request(app)
    .post('/product')
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "enter a number"
        })

      done()
    })

  })
})


//upate product


describe('PUT /product/:id update product with new data', ()=> {
  it('should return status 200 with success message',(done)=> {
    let body = {
      name: "updated product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "work",
      price: 10000,
      stock: 2,
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('msg')
      expect(res.body).toEqual({
        "msg": "Success edit product"
      })
      done()
    })

  })
})


//update fail
describe('PUT /product/:id update product with no access token', ()=> {
  it('should return status 401 with error message',(done)=> {
    let body = {
      name: "updated product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 10000,
      stock: 2,
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    // .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
      
      expect(res.body).toEqual({
        "error": {
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }
      })
      done()
    })

  })
})


describe('PUT /product/:id update product with not admin access token', ()=> {
  it('should return status 401 with error message',(done)=> {
    let body = {
      name: "updated product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 10000,
      stock: 2,
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(cust_access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "Unauthorized!",
      })
      done()
    })

  })
})


describe('PUT /product/:id update product with empty required fields', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "",
      image_url: '',
      category: "",
      price: null,
      stock: null,
      UserId: null
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')

      done()
    })


  })
})



describe('PUT /product/:id update products negative stocks', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: 5000,
      stock: -1,
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "stock cannot be negative"
    })
      done()
    })

  })
})


describe('PUT /product/:id update product wrong data type', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: "FiFtyThouSAND DOllAS",
      stock: "wan dollas",
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "enter a number"
      })

      done()
    })

  })
})

describe('PUT /product/:id update products negative Price', ()=> {
  it('should return status 400 with error message',(done)=> {
    let body = {
      name: "new product",
      image_url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2019/12/how-to-execute-a-link-conversion-strategy-5df792498b991-760x400.png',
      category: "home",
      price: -5000,
      stock: 1,
      UserId: 1
    }

    request(app)
    .put('/product/' + id)
    .send(body)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "price cannot be negative"
    })
      done()
    })

  })

//delete fail

describe('DELETE /product/:id delete with no access token ', ()=> {
  it('should return status 200 with succes message',(done)=> {
    request(app)
    .delete('/product/' + id)
    // .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
     
      expect(res.body).toEqual({
        "error": {
            "name": "JsonWebTokenError",
            "message": "jwt must be provided"
        }
      })
      done()
    })

  })
})

describe('DELETE /product/:id delete with not admin access token ', ()=> {
  it('should return status 200 with succes message',(done)=> {
    request(app)
    .delete('/product/' + id)
    .set(cust_access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('error')
     
      expect(res.body).toEqual({
        "error": "Unauthorized!",
      })
      done()
    })

  })
  })
})

//succes delete

describe('DELETE /product/:id delete succesfull', ()=> {
  it('should return status 200 with success message',(done)=> {
    request(app)
    .delete('/product/' + id)
    .set(access_token)
    .end((err, res)=> {
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('msg')
     
      expect(res.body).toEqual({
        "msg": "Product deleted successfully!"
        })
      done()
    })

  })
})



afterAll((done) => {
  Product.destroy({where: {}})
    .then(data=>{
      sequelize.close()
      done()
    })
    .catch(err=>{
      done(err)
    })
})
