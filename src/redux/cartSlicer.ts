import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderDetail } from '@/dto'
import { getTotalPrice, getTotalQuantity, localeNumber } from '@/utils'
import { WritableDraft } from 'immer/dist/internal'
import { InfiniteData } from 'react-query'

export type CartModalType = 'delete' | 'confirm' | null

type CartState = {
  checkedIds: string[]
  items: OrderDetail[]
  onSaleItems: OrderDetail[]
  quantity: number
  price: string
}

const initialState: CartState = {
  checkedIds: [],
  items: [],
  onSaleItems: [],
  quantity: 0,
  price: '0',
}

const getCheckedItems = (state: WritableDraft<CartState>) =>
  state.checkedIds.reduce<OrderDetail[]>((res, id) => {
    const item = state.onSaleItems.find(prod => prod.productId === id)
    if (item) res.push(item)
    return res
  }, [])

const setPrice = (state: WritableDraft<CartState>) => {
  const items = getCheckedItems(state)
  state.quantity = getTotalQuantity(items)
  state.price = localeNumber(getTotalPrice(items))
  return state
}

export const CartState = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setCartItems: (
      state,
      { payload: items }: PayloadAction<InfiniteData<OrderDetail[]>>,
    ) => {
      const newItems = items.pages.flat()
      state.items = newItems
      state.onSaleItems = newItems.filter(item => !!item.product.createdAt)
      setPrice(state)
      return state
    },
    toggleCartItem: (state, { payload: id }: PayloadAction<string>) => {
      const index = state.checkedIds.indexOf(id)
      if (index >= 0) state.checkedIds.splice(index, 1)
      else state.checkedIds.push(id)
      setPrice(state)
      return state
    },
    toggleCartAll: state => {
      if (state.checkedIds.length === state.onSaleItems.length)
        state.checkedIds = []
      else state.checkedIds = state.onSaleItems.map(item => item.productId)
      setPrice(state)
      return state
    },
  },
})

export const { setCartItems, toggleCartItem, toggleCartAll } = CartState.actions
const CartReducer = CartState.reducer
export default CartReducer
