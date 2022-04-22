import { createAsyncThunk } from '@reduxjs/toolkit'

import * as service from '$services/cart'
import { Cart } from '$types/dto'

export const fetchCarts = createAsyncThunk<Cart[]>('cart/fetchCarts', async () => {
  const carts = await service.fetchCarts()
  return carts
})
