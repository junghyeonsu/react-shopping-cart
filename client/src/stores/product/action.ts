import { createAsyncThunk } from '@reduxjs/toolkit'

import * as services from '$services/product'
import { Product } from '$types/dto'

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const products = await services.fetchProducts()
  return products
})
