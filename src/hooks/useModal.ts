import { ModalTypes } from '@/components/modal'
import { setModal } from '@/redux/modalSlicer'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'

const useModal = () => {
  const dispatch = useDispatch()
  const { type, data } = useAppSelector(state => state.modal)
  const set = (type: ModalTypes | null, data: any = null) => {
    dispatch(setModal({ type, data }))
  }
  return {
    type,
    data,
    setModal: set,
    closeModal: () => set(null),
  }
}
export default useModal
