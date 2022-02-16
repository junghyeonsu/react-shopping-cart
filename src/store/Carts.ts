import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Cart, Product } from "../types/dto";

interface CartsState {
  cartsList: Array<Cart>;
}

const initialState: CartsState = {
  cartsList: [],
};

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postCart.pending, (state) => {
        state.cartsList = [...state.cartsList];
      })
      .addCase(postCart.fulfilled, (_, action) => {
        console.log(action.payload);
      })
      .addCase(postCart.rejected, (_, action) => {
        console.log(action.error.message);
      });
  },
});

export const postCart = createAsyncThunk(
  "cart/post",
  async (product: Product) => {
    const response = await axios.post("http://localhost:3003/carts", {
      product,
    });
    return response.data;
  }
);

export default cartsSlice.reducer;
