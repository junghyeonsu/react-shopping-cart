import { combineReducers } from 'redux';
import { productSlice, ProductState } from './product/productSlice';
import { cartSlice, CareState } from './cart/cartSlice';
import { orderSlice, OrderState } from './order/orderSlice';

export interface RootState {
  product: ProductState;
  cart: CareState;
  order: OrderState;
}

export const rootReducer = combineReducers({
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
});
