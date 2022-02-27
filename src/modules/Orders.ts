import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order, OrderDetail } from "../types/dto";

interface OrdersState {
  ordersList: Array<Order>;
}

const initialState: OrdersState = {
  ordersList: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.ordersList = [...state.ordersList];
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.ordersList = [...action.payload];
      })
      .addCase(getOrders.rejected, (_, action) => {
        console.log(action.error.message);
      });

    builder
      .addCase(postOrder.pending, (state) => {
        state.ordersList = [...state.ordersList];
      })
      .addCase(postOrder.fulfilled, (_, action) => {
        console.log(action.payload);
      })
      .addCase(postOrder.rejected, (_, action) => {
        console.log(action.error.message);
      });
  },
});

export const getOrders = createAsyncThunk("order/get", async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3003/orders",
    headers: { "Cache-Control": "no-cache" },
  });
  return response.data;
});

export const postOrder = createAsyncThunk(
  "order/post",
  async (orderDetails: Array<OrderDetail>) => {
    const response = await axios.post("http://localhost:3003/orders", {
      orderDetails,
    });
    return response.data;
  }
);

export default ordersSlice.reducer;
