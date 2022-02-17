import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { orderAdapter } from './orderSlice';

const selectOrderState = (state: RootState) => state.order;

const orderSelectors = orderAdapter.getSelectors();

export const getOrdersAll = createSelector(
  selectOrderState,
  orderSelectors.selectAll,
);

export const getSelectedOrder = createSelector(
  selectOrderState,
  (state) => state.selectedOrder,
);

export const getIsOrderLoading = createSelector(
  selectOrderState,
  state => state.isLoading
)
