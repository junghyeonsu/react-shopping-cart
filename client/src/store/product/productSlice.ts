import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { getProducts, getProductWithId } from '@/apis/product';
import { ProductI } from '@/models/product';

export const fetchProducts = createAsyncThunk<ProductI[]>(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchProductById = createAsyncThunk<ProductI, string>(
  'product/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getProductWithId(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export interface ProductState extends EntityState<ProductI> {
  selectedProduct: ProductI;
  isLoading: boolean;
}

export const productAdapter = createEntityAdapter<ProductI>();

const initialState = productAdapter.getInitialState({
  selectedProduct: {},
  isLoading: false,
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        productAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.rejected, (_, action) => {
        // console.log(action.error.message)
        window.alert('데이터를 정상적으로 가져오지 못했습니다. 다시 시도 해주세요.');
      });
    builder
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
      }).addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.rejected, (_, action) => {
        window.alert('데이터를 정상적으로 가져오지 못했습니다. 다시 시도 해주세요.');
      });
  },
});

export default productSlice.reducer;
