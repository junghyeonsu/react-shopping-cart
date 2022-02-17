import { combineReducers } from 'redux';
import { EntityState } from '@reduxjs/toolkit';
import { CartItemI } from '@/models/cart';
import { productSlice, ProductState } from './product/productSlice';
import { cartSlice } from './cart/cartSlice';
import { orderSlice, OrderState } from './order/orderSlice';


export interface RootState {
  product: ProductState;
  cart: EntityState<CartItemI>;
  order: OrderState;
}

export const rootReducer = combineReducers({
  product: productSlice.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer,
});

