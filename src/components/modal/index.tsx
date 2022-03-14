import CartAddModal from './cartAddModal'
import CartRedirectModal from './cartRedirectModal'
import CartConfirmModal from './cartConfirmModal'
import CartDeleteModal from './cartDeleteModal'
import OrderConfirmModal from './orderConfirmModal'
import useModal from '@/hooks/useModal'
import classNames from 'classnames'

export type ModalTypes =
  | 'cart_add'
  | 'cart_redirect'
  | 'cart_confirm'
  | 'cart_delete'
  | 'order_confirm'

const ModalComponents: { [key in ModalTypes]: () => JSX.Element | null } = {
  cart_add: CartAddModal,
  cart_redirect: CartRedirectModal,
  cart_confirm: CartConfirmModal,
  cart_delete: CartDeleteModal,
  order_confirm: OrderConfirmModal,
}

const Modal = () => {
  const { type: modalType, closeModal } = useModal()
  const ModalComponent = modalType && ModalComponents[modalType]

  return (
    <div id="modalRoot" className={classNames({ show: !!modalType })}>
      <div className="modal-dimmed" onClick={closeModal} />
      {ModalComponent && <ModalComponent />}
    </div>
  )
}

export default Modal
