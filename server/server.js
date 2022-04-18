// json-server
const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// lowdb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.join(__dirname, 'db.json'))
const db = low(adapter)

server.use(middlewares)

server.use(jsonServer.bodyParser)
// page: number
// per_page: number
// total: number
// total_pages: number
// data: T[]

const PAGE_PER_PRODUCT = 12
server.get('/products', (req, res) => {
  const page = Number(req.query.page) ?? 1

  const startProduct = Number(PAGE_PER_PRODUCT * (page - 1))

  const products = db
    .get('products')
    .slice(startProduct, startProduct + PAGE_PER_PRODUCT)
    .value()

  const productTotal = db.get('products').value().length

  const response = {
    page,
    per_page: PAGE_PER_PRODUCT,
    total: productTotal,
    total_pages: Math.ceil(productTotal / PAGE_PER_PRODUCT),
    data: products,
  }

  res.send(response)
})

server.get('/product', (req, res) => {
  const productId = Number(req.query.productId)

  if (!productId) {
    res.sendStatus(404)
    return
  }

  const product = db
    .get('products')
    .find((product) => product.id === productId)
    .value()

  res.send(product)
})

server.post('/products', (req, res) => {
  const { price, name, imageUrl } = req.body

  if (
    !Number.isInteger(price) ||
    typeof name !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    res.sendStatus(400)
  } else {
    db.get('products').push({ id: Date.now(), price, name, imageUrl }).write()
    res.sendStatus(201)
  }
})

server.get('/carts', (req, res) => {
  const carts = db.get('carts').values()

  res.send(carts)
})

server.post('/carts', (req, res) => {
  const { product } = req.body
  const { id, price, name, imageUrl } = product

  const carts = db.get('carts').values()
  const cartIds = [...carts.map((cart) => cart.id)]

  if (cartIds.includes(id)) {
    res.sendStatus(409)
    return
  }

  if (
    !Number.isInteger(price) ||
    typeof name !== 'string' ||
    typeof imageUrl !== 'string'
  ) {
    res.sendStatus(400)
  } else {
    db.get('carts')
      .push({
        id: product.id,
        product: {
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        },
      })
      .write()
    res.sendStatus(201)
  }
})

server.delete('/carts', (req, res) => {
  const { productIds } = req.body

  const removeCartItems = () => {
    productIds.forEach((id) => {
      db.get('carts').remove({ id }).write()
    })

    console.log('delete Item Ids: ', productIds)
  }

  removeCartItems(db.get('carts'))

  res.sendStatus(200)
})

server.get('/orders', (req, res) => {
  const orders = db.get('orders').values()
  res.send(orders)
})

server.get('/order', (req, res) => {
  const orderId = Number(req.query.orderId)

  console.log(orderId)
  if (!orderId) {
    res.sendStatus(404)
    return
  }

  const order = db
    .get('orders')
    .find((order) => order.id === orderId)
    .value()
  res.send(order)
})

server.post('/orders', (req, res) => {
  const { orderDetails } = req.body

  for (const orderDetail of orderDetails) {
    const { quantity, price, name, imageUrl } = orderDetail

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      !Number.isInteger(price) ||
      typeof name !== 'string' ||
      typeof imageUrl !== 'string'
    ) {
      res.sendStatus(400)
      return
    }
  }

  db.get('orders')
    .push({
      id: Date.now(),
      orderDetails,
    })
    .write()
  res.sendStatus(201)
})

// default router
server.use(router)

server.listen(3003, () => {
  console.log('JSON Server is running')
})
