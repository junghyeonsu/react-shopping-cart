import { createSlice } from "@reduxjs/toolkit";

import type { ProductType } from "../../types";

interface InitialState {
  checkedIds: string[];
  products: ProductType[];
}

const initialState: InitialState = {
  checkedIds: [],
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => ({
      ...state,
      products: action.payload,
    }),
  },
});

export const { setProducts } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export default cartSlice;
