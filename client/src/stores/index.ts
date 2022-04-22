import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { cartReducer } from './cart'
import { productReducer } from './product'

const store = configureStore({
  reducer: { cart: cartReducer, product: productReducer },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
