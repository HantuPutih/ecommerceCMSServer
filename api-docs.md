# E-commerce CMS

## User

- /user/login (post)

admin only

required: 
```json
email=[string]
password=[string]
```

**success response**


200 status code ok

user yang login akan memiliki token yang unik

```json
{
    "acces_token": "<token>"
}
```

**error responses**

jika password/email salah atau tidak diisi:
```json
{
    "error": "invalid email/password"
}
```


500 status code internal server error

```json
{
    "msg": "internal server error"
}
```



## products

- /product (get) authenticate

**success response**

memerlukan access_token pada headers untuk autentikasi

200 status response OK

```json
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
    {
        "name": "sol sendal",
        "image_url": "<img link>",
        "category": "home",
        "price": 10000,
        "stock": 1,
        "UserId": 1,
        "owner": "neww@mail.com",
        "createdAt": "2021-02-12T09:17:51.782Z",
        "updatedAt": "2021-02-12T09:17:51.782Z"
    }
]
```
**error responses**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product (post) authenticate & auhtorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 

```json
name=[string]
image_url=[string]
category=[string]
price=[integer double]
stock=[integer]
UserId=[integer]

```

**success response**

201 status response created


```json
{
    "name": "sol sepatu",
    "image_url": "<img link>",
    "category": "home",
    "price": 20000,
    "stock": 2,
    "UserId": 1,
    "createdAt": "2021-02-12T09:10:07.538Z",
    "updatedAt": "2021-02-12T09:12:13.723Z"
}

```

**error responses**

400 status response bad request

```json
{
    "error": "Name cannot be empty!"
}
```
```json
{
    "error": "category cannot be empty!"
}
```
```json
{
    "error": "image_url cannot be empty!"
}
```
```json
{
    "error": "price cannot be negative"
}
```
```json
{
    "error": "stock cannot be negative"
}
```
```json
{
    "error": "enter a number"
}
```

jika role adalah customer
```json
{
    "error": "Unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /products/:id (get) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 
```json
product.id=[integer]
```

**success response**

200 status response OK

```json
{
    "name": "sol sepatu",
    "image_url": "<img link>",
    "category": "home",
    "price": 20000,
    "stock": 2,
    "UserId": 1,
    "createdAt": "2021-02-12T09:10:07.538Z",
    "updatedAt": "2021-02-12T09:12:13.723Z"
}
```

**error responses**

404 not found

```json
{
    "error": "Product not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product/:id (put) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 

```json
name=[string]
image_url=[string]
price=[integer double]
category=[string]
stock=[integer]
UserId=[integer]
product.id=[integer]
```


**success response**

200 status response OK

```json
{
    "msg": "Success edit product"
}
```

**error responses**


400 status response bad request

```json
{
    "error": "Name cannot be empty!"
}
```
```json
{
    "error": "image_url cannot be empty!"
}
```
```json
{
    "error": "category cannot be empty!"
}
```
```json
{
    "error": "price cannot be negative"
}
```
```json
{
    "error": "stock cannot be negative"
}
```
```json
{
    "error": "enter a number"
}
```

404 not found

```json
{
    "error": "Product not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product/:id (delete) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 
```json
product.id = [integer]
```

**success response**

200 status response OK

```json
{
    "msg": "Product deleted successfully!"
}
```

**error responses**

404 not found

```json
{
    "error": "Product not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

# Banner

- /banner (get) authenticate

**success response**

memerlukan access_token pada headers untuk autentikasi

200 status response OK

```json
[
    {
        "id": 13,
        "title": "zalora",
        "status": true,
        "image_url": "https://static-id.zacdn.com/cms/Lookback/2017-MAIN-BANNER.jpg",
        "createdAt": "2021-02-20T06:22:06.711Z",
        "updatedAt": "2021-02-20T07:11:28.388Z"
    }
    {
        "id": 12,
        "title": "qweqwe",
        "status": true,
        "image_url": "https://static-id.zacdn.com/cms/Lookback/2017-MAIN-BANNER.jpg",
        "createdAt": "2021-02-20T06:20:41.817Z",
        "updatedAt": "2021-02-20T06:39:14.685Z"
    },
]
```
**error responses**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product (post) authenticate & auhtorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 

```json
title=[string]
image_url=[string]
status=[boolean]
```

**success response**

201 status response created


```json
{
    "id": 10,
    "title": "qweqwe",
    "status": true,
    "image_url": "https://static-id.zacdn.com/cms/Lookback/2017-MAIN-BANNER.jpg",
    "createdAt": "2021-02-20T06:19:32.408Z",
    "updatedAt": "2021-02-20T06:39:18.485Z"
},

```

**error responses**

400 status response bad request

```json
{
    "error": "title cannot be empty!"
}
```
```json
{
    "error": "status cannot be empty!"
}
```
```json
{
    "error": "image_url cannot be empty!"
}


jika role adalah customer
```json
{
    "error": "Unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /banner/:id (get) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 
```json
banner.id=[integer]
```

**success response**

200 status response OK

```json
{
    "id": 10,
    "title": "<updatad title>",
    "status": "<status title>",
    "image_url": "<updatad image_url>",
    "createdAt": "2021-02-20T06:19:32.408Z",
    "updatedAt": "2021-02-20T06:39:18.485Z"
},
```

**error responses**

404 not found

```json
{
    "error": "Product not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /banner/:id (put) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 

```json
title=[string]
image_url=[string]
status=[boolean]
banner.id=[integer]
```

**success response**

200 status response OK

```json
{
    "msg": "Success edit banner"
}
```

**error responses**


400 status response bad request

```json
{
    "error": "title cannot be empty!"
}
```
```json
{
    "error": "image_url cannot be empty!"
}
```
```json
{
    "error": "status cannot be empty!"
}
```

404 not found

```json
{
    "error": "Banner not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /banner/:id (delete) authenticate & authorize

memerlukan access_token admin pada headers untuk autentikasi dan autorisasi

required: 
```json
banner.id = [integer]
```

**success response**

200 status response OK

```json
{
    "msg": "banner deleted successfully!"
}
```

**error responses**

404 not found

```json
{
    "error": "banner not found!"
}
```

401 not authorized

```json
{
    "error": "unauthorized!"
}
```

## Customer

- /user/loginCustomer (post)

request:

required: 

```json
email=[string]
password=[string]
```

**success response**

```json
"access_token": "<unique token>"
```

**error response**

jika password/email salah atau tidak diisi:
```json
{
    "error": "invalid email/password"
}
```


500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product/customer/home (get)

mendapatkan semua product dengan kategori home


**success response**


```json
[
    {
        "id": 29,
        "name": "computers",
        "image_url": "https://www.thepcdoctor.com.au/wp-content/uploads/2019/04/desktop-computers-2.jpg",
        "category": "home",
        "price": 1000000,
        "stock": 2,
        "createdAt": "2021-02-24T08:29:56.847Z",
        "updatedAt": "2021-02-24T08:29:56.847Z"
    },
    {
        "id": 28,
        "name": "laptop",
        "image_url": "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg",
        "category": "home",
        "price": 10000000,
        "stock": 20,
        "createdAt": "2021-02-24T08:25:50.228Z",
        "updatedAt": "2021-02-24T08:25:55.095Z"
    }
]
```

**error response**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /product/customer/work (get)

mendapatkan semua product dengan kategori work

**success response**

```json
[
    {
        "id": 25,
        "name": "sendal",
        "image_url": "https://static.bmdstatic.com/pk/product/medium/5c998ce43aeec.jpg",
        "category": "work",
        "price": 22222,
        "stock": 222222,
        "createdAt": "2021-02-17T15:43:25.409Z",
        "updatedAt": "2021-02-17T15:47:45.817Z"
    },
    {
        "id": 14,
        "name": "keyboard",
        "image_url": "https://cdn.shopify.com/s/files/1/1920/0265/products/ZT_Keyboard_Silver_Bezel_transparent_background_-_squared_600x600.jpg?v=1571342079",
        "category": "work",
        "price": 1000,
        "stock": 2,
        "createdAt": "2021-02-17T09:27:22.545Z",
        "updatedAt": "2021-02-19T13:42:42.166Z"
    }
]

```

**error response**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /product/customer/other (get)

mendapatkan semua product dengan kategori other


**success response**

```json
[
    {
        "id": 25,
        "name": "food",
        "image_url": "https://static.bmdstatic.com/pk/product/medium/5c998ce43aeec.jpg",
        "category": "other",
        "price": 22222,
        "stock": 222222,
        "createdAt": "2021-02-17T15:43:25.409Z",
        "updatedAt": "2021-02-17T15:47:45.817Z"
    },
    {
        "id": 14,
        "name": "tikus",
        "image_url": "https://cdn.shopify.com/s/files/1/1920/0265/products/ZT_Keyboard_Silver_Bezel_transparent_background_-_squared_600x600.jpg?v=1571342079",
        "category": "other",
        "price": 1000,
        "stock": 2,
        "createdAt": "2021-02-17T09:27:22.545Z",
        "updatedAt": "2021-02-19T13:42:42.166Z"
    }
]

```

**error response**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /product/customer/mycart (get) authenticate

mengambil semua list item di cart dari user yang sedang login

request:

headers: access_token

**success response**

response

```json
{
    "cartList": [
        {
            "id": 27,
            "UserId": 2,
            "ProductId": 26,
            "quantity": 2,
            "status": "false",
            "Product": {
                "id": 26,
                "name": "shoe",
                "image_url": "http://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-7fc6-4b58-8b3f-6d05cef0369c_600x600.png?v=1610061677",
                "category": "home",
                "price": 12312,
                "stock": 2,
                "createdAt": "2021-02-19T13:10:34.476Z",
                "updatedAt": "2021-02-24T08:23:43.793Z"
            }
        }
    ]
}

```

**error response**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product/customer/:id' (post) authenticate

menambah item ke cart user yang sedan login

request:

access_token (headers), ProductId (params), & quantity (body) automatis 1


**success response**

status 201 created

item belum ada di cart dan akan dimasukkan ke cart

```json

{
    "msg": "Item added to cart",
}

```


status 200 OK

jika item sudah ada di cart, automatis akan ditambah 1 quantity-nya

```json

{
    "msg": "Item already in cart, quantity updated",
}

```


**error response**

status 400 item 

jika user menambahkan quantity melebihi stock produk yang tersedia

```json

{
    "msg": "quantity exceeded product in stock",
}

```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

- /product/customer/:id (patch) authenticate & authorize

request:

access_token(headers) & id untuk product (params)

**success response**

200 status response OK

```json
{
    "msg": "success patchCart"
}
```

**error response**

status 400 ketika user menambahkan quantity melebihi stock produk yang tersedia

```json
{
    "err": {
        "msg": "quantity exceeded product in stock",
        "status": 400,
        "from": "patchCart"
    }
}
```

status 404 jika cart tidak ditemukan

```json
{
    "error": "Cart not found!"
}
```

status 401 jika mencoba meng-update cart milik user lain

```json
{
    "msg": "Unauthorized!", 
    "status": 401
}

```

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```


- /product/customer/:id (delete) authenticate & authorize

request:

access_token(headers) & cart id (params)

response:


**success response**

200 status response OK

```json
{
    "msg": "product in cart deleted"
}
```


**error response**

500 status code internal server error

```json
{
    "msg": "internal server error"
}
```

status 404 jika cart tidak ditemukan

```json
{
    "error": "Cart not found!"
}
```

status 401 jika mencoba menghapus cart milik user lain

```json
{
    "msg": "Unauthorized!", 
    "status": 401
}

```
