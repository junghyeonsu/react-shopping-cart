import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit'
import { Order } from '../../../types/dto'
import { orderApi } from '../api'
import { orderEndPoint } from '../service/order'

const initialState: OrderState = {
  currentRequestId: undefined,
  error: null,
  loading: 'idle',
  orders: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.orders = action.payload
          state.currentRequestId = undefined
        }
      })

      .addCase(fetchOrderList.rejected, (state, action) => {
        const { requestId } = action.meta

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  },
})

const fetchOrderList = createAsyncThunk('order/fetchOrderList', async (_, __) => {
  const response = await orderApi.fetchOrders()
  return response.data as Order[]
})

export { fetchOrderList }
export default orderSlice.reducer

interface OrderState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | SerializedError
  orders: Order[]
  currentRequestId: undefined | string
}
