import { configureStore, createSelector } from '@reduxjs/toolkit'
import { cartApi } from '../service/cart'
import { productEndPoint } from '../service/product'
import { orderEndPoint } from '../service/order'
import cartReducer from '../slice/cart'

export const store = configureStore({
  reducer: {
    [productEndPoint.reducerPath]: productEndPoint.reducer,
    [orderEndPoint.reducerPath]: orderEndPoint.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartApi.middleware),
})

/**
 * Cart Reducer
 */
const getCartLoadingStatus = (state: RootState) => state.cart.loading
const getCartItems = (state: RootState) => state.cart.cartItems
const getCartSubmitItems = (state: RootState) => state.cart.orderSubmitedItems

const getCartItemTotalPrice = createSelector(getCartItems, (cartItems) => {
  return cartItems
    .filter((cartItem) => cartItem.isChecked)
    .map((cartItem) => cartItem.quantity * cartItem.product.price)
    .reduce((prev, curr) => prev + curr, 0)
})

const getCartCheckedProductCount = createSelector(getCartItems, (cartItems) => {
  return cartItems.filter((cartItem) => cartItem.isChecked).length
})

const getCartItemAllChecked = createSelector(getCartItems, (cartItems) => {
  return cartItems.filter((cartItem) => cartItem.isChecked).length === cartItems.length
})

/**
 * Order Reducer
 */

export { getCartLoadingStatus, getCartItems, getCartSubmitItems, getCartItemTotalPrice, getCartCheckedProductCount, getCartItemAllChecked }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
