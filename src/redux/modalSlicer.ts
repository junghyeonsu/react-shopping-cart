import { ModalTypes } from '@/components/modal'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  type: ModalTypes | null
  data: any
}

const initialState: ModalState = {
  type: null,
  data: null,
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, { payload }: PayloadAction<ModalState>) => {
      state.type = payload.type
      state.data = payload.data
      return state
    },
    closeModal: state => {
      state.type = null
      state.data = null
      return state
    },
  },
})

export const { setModal, closeModal } = ModalSlice.actions
const ModalReducer = ModalSlice.reducer
export default ModalReducer
