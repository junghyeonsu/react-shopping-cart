import { useAddOrder } from '@/api'
import { cartDeleteHandler } from '@/api/cartMutationHandler'
import { OrderDetail } from '@/dto'
import useModal from '@/hooks/useModal'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../product/item'

const OrderConfirmModal = () => {
  const { data, closeModal } = useModal()
  const items = data as OrderDetail[]
  const { mutate: addOrder } = useAddOrder()
  const navigate = useNavigate()

  const requestOrder = () => {
    if (!items?.length) return
    addOrder(items, {
      onSuccess: newItem => {
        cartDeleteHandler(newItem.orderDetails)
        closeModal()
        navigate('/orders')
      },
    })
  }

  if (!items?.length) return null

  return (
    <div className="modal cart-confirm-modal">
      <h3 className="modal-header">결제를 진행할까요?</h3>
      <div className="product-list">
        {items.map(item => (
          <ProductItem
            item={item.product}
            productId={item.productId}
            key={item.productId}
            hideButton
          />
        ))}
      </div>
      <div className="button-group">
        <button className="button button--cancel" onClick={closeModal}>
          취소
        </button>
        <button className="button button--success" onClick={requestOrder}>
          결제
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmModal
