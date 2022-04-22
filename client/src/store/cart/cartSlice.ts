import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { getCartList } from '@/apis/cart';
import { CartItemI } from '@/models/cart';

export const fetchCartList = createAsyncThunk<CartItemI[]>(
  'cart/fetchCartList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartList();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export interface CareState extends EntityState<CartItemI> {
  isLoading: boolean;
  hasError: boolean;
}

export const cartAdapter = createEntityAdapter<CartItemI>();

const initialState = cartAdapter.getInitialState({
  isLoading: false,
  hasError: false,
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        cartAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCartList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartList.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default cartSlice.reducer;
