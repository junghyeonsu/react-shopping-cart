import { Product } from '$types/dto'
import api from '$utils/api'

export const fetchProducts = async () => {
  const { data } = await api.get<Product[]>('/products')

  return data
}

export const fetchProduct = async (id: number) => {
  const { data } = await api.get<Product>(`/products/${id}`)

  return data
}
