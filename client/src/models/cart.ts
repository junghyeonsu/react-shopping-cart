import { ProductI } from './product';

export interface CartItemI {
  id: number;
  product: Omit<ProductI, 'id'>;
}

export interface CartItemInfoI {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  quantity: number;
  isChecked: boolean;
}
