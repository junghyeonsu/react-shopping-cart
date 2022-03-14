import { useDeleteCarts } from '@/api'
import { cartDeleteHandler } from '@/api/cartMutationHandler'
import useGetCartItems from '@/hooks/useGetCartItems'
import useModal from '@/hooks/useModal'
import ProductItem from '../product/item'

const CartDeleteModal = () => {
  const { mutate: deleteItems } = useDeleteCarts()
  const { data, closeModal } = useModal()
  const items = useGetCartItems()(data)

  const deleteCarts = () => {
    if (!items?.length) return
    deleteItems(
      items.map(item => item.productId),
      {
        onSuccess: () => {
          cartDeleteHandler(items)
          closeModal()
        },
      },
    )
  }

  if (!items?.length) return null

  return (
    <div className="modal cart-confirm-modal">
      <h3 className="modal-header">정말 삭제하실건가요?</h3>
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
        <button className="button button--danger" onClick={deleteCarts}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default CartDeleteModal
