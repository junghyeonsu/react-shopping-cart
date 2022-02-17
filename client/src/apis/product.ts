import { api } from './index';
import { ProductI } from '@/models/product';

export const getProducts = () => {
  return api.get('/products');
};

export const addProduct = (product: ProductI) => {
  return api.post('/products', product);
};

export const getProductWithId = (id: string) => {
  return api.get(`/products/${id}`);
};

export const deleteProductWithId = (id: string) => {
  return api.delete(`/products/${id}`);
};
