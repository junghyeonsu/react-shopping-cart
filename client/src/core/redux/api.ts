import axios from 'axios'
import { PostOrderDetail } from '../../types/dto'

const DEFAULT_URL = 'http://localhost:3003'

const cartApi = {
  fetchCarts: async () => axios.get(DEFAULT_URL + '/carts'),
  deleteCartItem: async (productIds: number[]) =>
    axios.delete(DEFAULT_URL + '/carts', {
      data: { productIds },
    }),
}

const orderApi = {
  fetchOrders: async () => axios.get(DEFAULT_URL + '/orders'),
  addOrder: async (postOrderDetail: PostOrderDetail) => axios.post(DEFAULT_URL + '/orders', postOrderDetail),
}

export { cartApi, orderApi }
