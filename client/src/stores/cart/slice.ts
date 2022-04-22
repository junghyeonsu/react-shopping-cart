import { createSlice } from '@reduxjs/toolkit'

import { Cart } from '$types/dto'

import { fetchCarts } from './action'

export interface CartState {
  loading: boolean
  error: boolean
  list: Cart[]
}

const initialState: CartState = {
  loading: false,
  error: false,
  list: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(fetchCarts.fulfilled, (state, { payload }) => {
        state.error = false
        state.loading = false
        state.list = payload
      })
      .addCase(fetchCarts.rejected, (state) => {
        state.error = true
        state.loading = false
      })
  },
})

export default cartSlice.reducer
