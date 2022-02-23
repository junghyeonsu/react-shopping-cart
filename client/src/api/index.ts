import axios from "axios"
import { Product } from "../types/product";

const api = axios.create({
  baseURL: 'http://localhost:3003',
})

export const requestGetProducts = async () => {
  const { data } = await api.get<Product[]>('/products');
  return data;
}