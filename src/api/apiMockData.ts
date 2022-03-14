const products = Array.from({ length: 45 }).map((_, i) => ({
  id: `mock_products_${i}`,
  createdAt: 1234567890123 - i * 1000,
  imageUrl:
    'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
  name: `젓가라악_${i}`,
  price: 2000 + (i + 1),
}))
const cart = Array.from({ length: 15 }).map((_, i) => ({
  product: products[i],
  productId: products[i].id,
  quantity: i + 1,
  updatedAt: 1234567892123 - i * 1000,
}))
const orders = Array.from({ length: 6 }).map((_, i) => {
  const orderDetails = Array.from({ length: i + 1 }).map((_, j) => ({
    product: products[i + j],
    productId: products[i + j].id,
    quantity: i + j + 1,
  }))
  return {
    createdAt: 1234567894123 - i * 1000,
    id: `mock_orders_${i}`,
    orderDetails,
  }
})

export default {
  products,
  cart,
  orders,
}
