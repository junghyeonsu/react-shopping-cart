import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type Product = {
  id: number;
  name: string;
  price: number;
};

const initialState = {
  products: [] as Product[],
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = product.actions;
