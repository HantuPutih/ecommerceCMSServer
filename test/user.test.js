const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')

//email ada pass salah,
//email tidak ada di db
//tidak memasukan email/ password


describe('POST /user/login', ()=>{
  it('should return status 200 with data', (done)=>{
    let body ={
      email: "admin@mail.com",
      password: "1234"
    }
    request(app)
    .post('/user/login')
    .send(body)
    .end((err,res)=>{
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(200)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('access_token')

      done()
    })
  })
  
})


describe('POST /user/login wrong password', ()=>{
  it('should return status 400 with error message', (done)=>{
    let body ={
      email: "admin@mail.com",
      password: "wrongPass"
    }
    request(app)
    .post('/user/login')
    .send(body)
    .end((err,res)=>{
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toStrictEqual({error: "invalid email/password"})

      done()
    })
  })
})

describe('POST /user/login no email in db', ()=>{
  it('should return status 400 with error message', (done)=>{
    let body ={
      email: "nomail@mail.com",
      password: "1234"
    }
   
    request(app)
    .post('/user/login')
    .send(body)
    .end((err,res)=>{
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toStrictEqual({error: "invalid email/password"})

      done()
    })
  })
})

describe('POST /user/login no email and password', ()=>{
  it('should return status 400 with error message', (done)=>{
     let body = {
      email: "",
      password: ""
    }
    request(app)
    .post('/user/login')
    .send(body)
    .end((err,res)=>{
      if (err) {
        done(err)
      }
      expect(res.status).toEqual(400)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toStrictEqual({error: "invalid email/password"})

      done()
    })
  })
})


afterAll((done) => {
  sequelize.close()
  done()
})



