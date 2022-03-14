import useGetCartItems from '@/hooks/useGetCartItems'
import useModal from '@/hooks/useModal'
import { setOrder } from '@/redux/orderSlicer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../product/item'

const CartConfirmModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, closeModal } = useModal()
  const items = useGetCartItems()(data)

  const addToOrder = () => {
    if (!items?.length) return
    closeModal()
    dispatch(setOrder(items))
    navigate('/order')
  }

  if (!items?.length) return null

  return (
    <div className="modal cart-confirm-modal">
      <h3 className="modal-header">이대로 주문할까요?</h3>
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
        <button className="button button--success" onClick={addToOrder}>
          결제
        </button>
      </div>
    </div>
  )
}

export default CartConfirmModal
