import { api } from './index';
import { OrderDetailsI } from '@/models/order';

export const addOrder = (orders: OrderDetailsI[]) => {
  return api.post(`/orders`, orders);
};

export const getOrderList = () => {
  return api.get('/orders');
};

export const getOrderWithId = (id: string) => {
  return api.get(`/orders/${id}`);
};
