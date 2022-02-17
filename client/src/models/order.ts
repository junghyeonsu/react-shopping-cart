import { ProductI } from './product';

export interface OrderDetailsI extends ProductI {
  quantity: number;
}

export interface OrderListI {
  id: number;
  orderDetails: OrderDetailsI[];
}

export interface UpdateOrderResponseI {
  orderDetails: OrderDetailsI[];
}
