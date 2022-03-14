import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderDetail } from '@/dto'
import { WritableDraft } from 'immer/dist/internal'
import { getTotalPrice, getTotalQuantity, localeNumber } from '@/utils'

type OrderState = {
  items: OrderDetail[]
  quantity: number
  price: string
}

const initialState: OrderState = {
  items: [],
  quantity: 0,
  price: '0',
}

const getPrice = (state: WritableDraft<OrderState>) => {
  state.quantity = getTotalQuantity(state.items)
  state.price = localeNumber(getTotalPrice(state.items))
  return state
}

export const OrderState = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setOrder: (state, { payload: items }: PayloadAction<OrderDetail[]>) => {
      state.items = items
      state = getPrice(state)
      return state
    },
    clearOrder: state => {
      state.items = []
      state = getPrice(state)
      return state
    },
  },
})

export const { setOrder, clearOrder } = OrderState.actions
const OrderReducer = OrderState.reducer
export default OrderReducer
