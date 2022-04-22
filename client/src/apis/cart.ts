import { api } from '.';
import { ProductI } from '@/models/product';

export const getCartList = () => {
  return api.get('/carts');
};

export const addCartItem = (product: ProductI) => {
  return api.post('/carts', { product });
};

export const deleteCartItem = (id: number) => {
  return api.delete(`/carts/${id}`);
};
