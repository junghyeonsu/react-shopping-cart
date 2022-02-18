import request from './request'
import { API_URL } from '../constants/api'
import { Product } from '../@types/products'

const requestGetProducts = async () => {
  const response = await request.get<Product>(API_URL.PRODUCTS)

  return response.data
}

export { requestGetProducts }
