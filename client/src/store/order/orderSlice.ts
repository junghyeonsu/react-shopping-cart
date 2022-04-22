import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { getOrderList, getOrderWithId } from '@/apis/order';
import { OrderListI } from '@/models/order';

export const fetchOrderList = createAsyncThunk<OrderListI[]>(
  'order/fetchOrderList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrderList();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async (id: string) => {
    const response = await getOrderWithId(id);
    return response.data;
  },
);

export interface OrderState extends EntityState<OrderListI> {
  selectedOrder: OrderListI;
  isLoading: boolean;
  hasError: boolean;
}

export const orderAdapter = createEntityAdapter<OrderListI>();

const initialState = orderAdapter.getInitialState({
  selectedOrder: {},
  isLoading: false,
  hasError: false,
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        orderAdapter.setAll(state, action.payload);
      })
      .addCase(fetchOrderList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderList.rejected, (state) => {
        state.hasError = true;
      });
    builder
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.hasError = true;
      });
  },
});

export default orderSlice.reducer;
