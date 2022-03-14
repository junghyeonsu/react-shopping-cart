import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import CartReducer from './cartSlicer'
import LastScrollReducer from './lastScrollSlicer'
import OrderReducer from './orderSlicer'
import ModalReducer from './modalSlicer'

export const store = configureStore({
  reducer: {
    lastScrollInfo: LastScrollReducer,
    cart: CartReducer,
    order: OrderReducer,
    modal: ModalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
