import axios from 'axios'

export const getProductList = (pageOffset: number, limit: number = 12) => {
  return axios.get(`/products?_limit=${limit}&_offset=${pageOffset}`)
}
