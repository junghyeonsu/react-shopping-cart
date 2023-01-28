/* eslint-disable no-shadow */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ProductType } from "../../types";

export interface State {
  products: ProductType[];
}

const initialState: State = {
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
        checked: product.checked || true,
      }));
      return {
        ...state,
        products,
      };
    },
    addProduct: (state: State, action: PayloadAction<ProductType>) => {
      const addedProduct = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
        checked: action.payload.checked || true,
      };

      return {
        ...state,
        products: [...state.products, addedProduct],
      };
    },
    increaseQuantity: (state: State, action: PayloadAction<{ id: number }>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id && product.quantity && product.quantity < 20) {
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
    decreaseQuantity: (state: State, action: PayloadAction<{ id: number }>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id && product.quantity && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
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
          if (action.payload.quantity < 1) {
            return {
              ...product,
              quantity: 1,
            };
          }

          if (action.payload.quantity > 20) {
            return {
              ...product,
              quantity: 20,
            };
          }

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
    toggleProduct: (state: State, action: PayloadAction<{ id: number }>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            checked: !product.checked,
          };
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    },

    toggleAllProducts: (state: State, action: PayloadAction<boolean>) => {
      const products = state.products.map((product) => ({
        ...product,
        checked: action.payload,
      }));

      return {
        ...state,
        products,
      };
    },

    deleteCheckedProducts: (state: State) => {
      const products = state.products.filter((product) => !product.checked);
      return {
        ...state,
        products,
      };
    },

    deleteProduct: (state: State, action: PayloadAction<number>) => {
      const products = state.products.filter((product) => product.id !== action.payload);
      return {
        ...state,
        products,
      };
    },

    clearCart: () => initialState,
  },
});

export const {
  addProduct,
  setProducts,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  toggleProduct,
  toggleAllProducts,
  deleteProduct,
  deleteCheckedProducts,
  clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;
