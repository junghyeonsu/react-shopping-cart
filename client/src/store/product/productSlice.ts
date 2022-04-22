import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
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
  hasError: boolean;
}

export const productAdapter = createEntityAdapter<ProductI>();

const initialState = productAdapter.getInitialState({
  selectedProduct: {},
  isLoading: false,
  hasError: false,
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        productAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
    builder
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default productSlice.reducer;
