import { api } from '.';
import { ProductI } from '@/models/product';

export const getCartList = () => {
  return api.get('/carts');
};

export const addCartItem = (item: ProductI) => {
  const cartItem: Omit<ProductI, 'id'> = {
    name: item.name,
    price: item.price,
    imageUrl: item.imageUrl,
  };
  return api.post('/carts', { product: cartItem });
};

export const deleteCartItem = (id: number) => {
  return api.delete(`/carts/${id}`);
};
