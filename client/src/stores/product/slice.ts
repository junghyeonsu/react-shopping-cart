import { createSlice } from '@reduxjs/toolkit'

import { Product } from '$types/dto'

import { fetchProducts } from './action'

export interface ProductState {
  loading: boolean
  error: boolean
  list: Product[]
}

const initialState: ProductState = {
  loading: false,
  error: false,
  list: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.error = false
        state.loading = false
        state.list = payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = true
        state.loading = false
      })
  },
})

export default productSlice.reducer
