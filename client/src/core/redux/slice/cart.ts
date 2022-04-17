import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer/dist/internal'
import { Cart, OrderDetail, PostOrderDetail } from 'src/types/dto'
import { cartApi, orderApi } from '../api'

const [CART_PRODUCT_MIN_QUANTITY, CART_PRODUCT_MAX_QUANTITY] = [1, 20]

const initialState = {
  cartItems: [],
  orderSubmitedItems: [],
  currentRequestId: undefined,
  error: null,
  loading: 'idle',
} as CartState

const getProduct = (cartItems: WritableDraft<CartItem>[], productId: number) => {
  const product = cartItems.find((product) => product.id === productId)

  if (!product) {
    throw new Error('invalid Product!!')
  }

  return product
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // @TODO:: delete this funtcion (for Debug)
    getState(state) {
      console.log('[CART DATA] ', state)
    },
    toggleProduct(state, action: ProductIdPayload) {
      const product = state.cartItems.find((product) => product.id === action.payload.productId)
      if (!product) {
        return
      }

      product.isChecked = !product.isChecked
    },
    changeProductQuantity(state, action: PayloadAction<{ productId: number; quantity: number }>) {
      const quantity = action.payload.quantity
      if (quantity < CART_PRODUCT_MIN_QUANTITY || quantity > CART_PRODUCT_MAX_QUANTITY) {
        return
      }

      const product = getProduct(state.cartItems, action.payload.productId)
      product.quantity = action.payload.quantity
    },
    increaseProductQuantity(state, action: ProductIdPayload) {
      const product = getProduct(state.cartItems, action.payload.productId)

      const quantity = product.quantity + 1
      if (quantity < CART_PRODUCT_MIN_QUANTITY || quantity > CART_PRODUCT_MAX_QUANTITY) {
        return
      }

      product.quantity = quantity
    },
    decreaseProductQuantity(state, action: ProductIdPayload) {
      const product = getProduct(state.cartItems, action.payload.productId)

      const quantity = product.quantity - 1
      if (quantity < CART_PRODUCT_MIN_QUANTITY || quantity > CART_PRODUCT_MAX_QUANTITY) {
        return
      }

      product.quantity = quantity
    },
    changeAllProductChecked(state, action: PayloadAction<{ check: boolean }>) {
      const newCartItems = state.cartItems.map((cartItem) => ({ ...cartItem, isChecked: action.payload.check }))

      state.cartItems = newCartItems
    },
    deleteCartItems(state, action: ProductIdsPayload) {
      const deleteItemIds = new Set(action.payload.productIds)
      state.cartItems = state.cartItems.filter(({ id }) => !deleteItemIds.has(id))
    },
    deleteSelectedCartItems(state) {
      const deleteTargetProductIds = state.cartItems.filter((cartItem) => cartItem.isChecked).map((cartItem) => cartItem.id)

      if (!deleteTargetProductIds.length) {
        return
      }

      const deleteProductIdSet = new Set(deleteTargetProductIds)
      state.cartItems = state.cartItems.filter((cartItem) => !deleteProductIdSet.has(cartItem.id))

      cartApi.deleteCartItem(deleteTargetProductIds)
    },

    submitCartItems(state) {
      const submitTargetCartItems = state.cartItems.filter((cartItem) => cartItem.isChecked)

      if (!submitTargetCartItems.length) {
        return
      }

      const deleteTargetProductIds = submitTargetCartItems.map((cartItem) => cartItem.id)

      const deleteProductIdSet = new Set(deleteTargetProductIds)
      state.cartItems = state.cartItems.filter((cartItem) => !deleteProductIdSet.has(cartItem.id))
      state.orderSubmitedItems = submitTargetCartItems

      cartApi.deleteCartItem(deleteTargetProductIds)
    },
    submitOrder(state) {
      const items = state.orderSubmitedItems

      if (!items.length) {
        return
      }

      const orderDetails: OrderDetail[] = items.map(({ id, product, quantity }) => ({
        id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity,
      }))

      orderApi.addOrder({ orderDetails })

      state.orderSubmitedItems = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartList.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchCartList.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.cartItems = action.payload.map((cartItem) => ({ ...cartItem, quantity: 1, isChecked: false }))
          state.currentRequestId = undefined
        }
      })

      .addCase(fetchCartList.rejected, (state, action) => {
        const { requestId } = action.meta

        if (state.loading === 'pending' && state.currentRequestId === requestId) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  },
})

const fetchCartList = createAsyncThunk('cart/fetchCartList', async (_, __) => {
  const response = await cartApi.fetchCarts()
  return response.data as Cart[]
})

export const {
  getState,
  changeProductQuantity,
  toggleProduct,
  increaseProductQuantity,
  changeAllProductChecked,
  decreaseProductQuantity,
  deleteCartItems,
  deleteSelectedCartItems,
  submitCartItems,
  submitOrder,
} = cartSlice.actions

export { fetchCartList }
export default cartSlice.reducer

export interface CartItem extends Cart {
  quantity: number
  isChecked: boolean
}

interface CartState {
  orderSubmitedItems: CartItem[]
  cartItems: CartItem[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null | SerializedError
  currentRequestId: undefined | string
}

type ProductIdPayload = PayloadAction<{ productId: number }>
type ProductIdsPayload = PayloadAction<{ productIds: number[] }>
