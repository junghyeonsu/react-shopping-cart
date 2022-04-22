import { cartHandler } from './handlers/cart';
import { orderHandler } from './handlers/order';
import { productHandler } from './handlers/product';

export const handlers = [...productHandler, ...cartHandler, ...orderHandler];
