/* eslint-disable no-shadow */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ProductType } from "../../types";

interface State {
  checkedIds: string[];
  products: ProductType[];
}

const initialState: State = {
  checkedIds: [],
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state: State, action: PayloadAction<ProductType[]>) => {
      const products = action.payload.map((product) => ({
        ...product,
        quantity: product.quantity || 1,
      }));
      return {
        ...state,
        products,
      };
    },
    addProduct: (state: State, action: PayloadAction<ProductType>) => ({
      ...state,
      products: [...state.products, { ...action.payload, quantity: action.payload.quantity || 1 }],
    }),
    increaseQuantity: (state: State, action: PayloadAction<number>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity ? product.quantity + 1 : 1,
          };
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    },
    decreaseQuantity: (state: State, action: PayloadAction<number>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity ? product.quantity - 1 : 1,
          };
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    },
    changeQuantity: (state: State, action: PayloadAction<{ id: number; quantity: number }>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    },
  },
});

export const { addProduct, setProducts, increaseQuantity, decreaseQuantity, changeQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;
