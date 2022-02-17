import { cartAdapter } from './cartSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

const selectCartState = (state: RootState) => state.cart;

const cartSelectors = cartAdapter.getSelectors();

export const getCartAll = createSelector(
  selectCartState,
  cartSelectors.selectAll,
);

export const getCartEntities = createSelector(
  selectCartState,
  cartSelectors.selectEntities,
);
