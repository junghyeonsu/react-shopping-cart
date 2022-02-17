import { createSelector } from '@reduxjs/toolkit';
import { productAdapter } from './productSlice';
import { RootState } from '../rootReducer';

const selectProductsState = (state: RootState) => state.product;

const productSelectors = productAdapter.getSelectors();

export const getProductsAll = createSelector(
  selectProductsState,
  productSelectors.selectAll,
);

export const getProductsEntities = createSelector(
  selectProductsState,
  productSelectors.selectEntities,
);

export const getSelectedProduct = createSelector(
  selectProductsState,
  (state) => state.selectedProduct,
);

export const getRandomRecommendProducts = createSelector(
  getProductsAll,
  (products) => {
    const RECOMMEND_ITEMS_AMOUNT = 3;
    const randomIndex = Math.floor(Math.random() * products.length - RECOMMEND_ITEMS_AMOUNT - 1);
    return products.slice(randomIndex, randomIndex + RECOMMEND_ITEMS_AMOUNT);
  },
);

export const getIsProductLoading = createSelector(
  selectProductsState,
  (state) => state.isLoading,
);
