import { ProductI } from './product';

export interface CartItemI {
  id: number;
  product: Omit<ProductI, 'id'>;
}
