import useModal from '@/hooks/useModal'
import { useNavigate } from 'react-router-dom'

const CartRedirectModal = () => {
  const navigate = useNavigate()
  const { closeModal } = useModal()
  const redirect = () => {
    closeModal()
    navigate('/cart')
  }

  return (
    <div className="modal cart-confirm-modal">
      <h3 className="modal-header">담겼습니다. 장바구니로 이동할까요?</h3>
      <div className="button-group">
        <button className="button button--cancel" onClick={closeModal}>
          그대로 있기
        </button>
        <button className="button button--success" onClick={redirect}>
          장바구니로
        </button>
      </div>
    </div>
  )
}

export default CartRedirectModal
