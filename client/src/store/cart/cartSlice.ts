import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { addCartItem, getCartList } from '@/apis/cart';
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

export const cartAdapter = createEntityAdapter<CartItemI>();

const initialState = cartAdapter.getInitialState();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartList.fulfilled, cartAdapter.setAll)
      .addCase(fetchCartList.rejected, (_, action) => {
        // const err = action.error.message;
        window.alert('데이터를 정상적으로 가져오지 못했습니다. 다시 시도 해주세요.');
      });
  },
});

export default cartSlice.reducer;
