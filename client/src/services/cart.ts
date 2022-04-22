import { Cart } from '$types/dto'
import api from '$utils/api'

export const fetchCarts = async () => {
  const { data } = await api.get<Cart[]>('/carts')

  return data
}
