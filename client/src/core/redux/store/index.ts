import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../service/product'

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
