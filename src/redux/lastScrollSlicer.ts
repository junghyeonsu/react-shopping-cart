import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RouteKey } from '@/app'

interface LastScrollState {
  page: RouteKey | null
  scroll: number
}

const initialState: LastScrollState = {
  page: null,
  scroll: 0,
}

export const LastScrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    saveLastScroll: (
      state,
      {
        payload: { page, scroll },
      }: PayloadAction<{
        page: RouteKey
        scroll: number
      }>,
    ) => {
      state.page = page
      state.scroll = scroll
      return state
    },
  },
})

export const { saveLastScroll } = LastScrollSlice.actions
const LastScrollReducer = LastScrollSlice.reducer
export default LastScrollReducer
