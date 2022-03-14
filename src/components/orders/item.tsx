import { OrderDetail } from '@/dto'
import useModal from '@/hooks/useModal'
import { SyntheticEvent } from 'react'

const OrderItem = ({
  product,
  product: { imageUrl, name, price, createdAt },
  productId,
  quantity,
}: OrderDetail) => {
  const { setModal } = useModal()
  const addToCart = (e: SyntheticEvent) => {
    e.stopPropagation()
    setModal('cart_add', {
      ...product,
      id: productId,
    })
  }

  if (!createdAt)
    return (
      <div className="order-list-item deleted">
        <div className="flex gap-15 mt-10">
          <img className="order-list-item__image" src={imageUrl} alt={name} />
          <div className="flex-col gap-15">
            <span className="order-name">{name}</span>
            <span className="order-info">
              {price}원 / 수량: {quantity}개
            </span>
          </div>
        </div>
        <div className="flex-center self-start">판매중단 상품입니다.</div>
      </div>
    )

  return (
    <div className="order-list-item">
      <div className="flex gap-15 mt-10">
        <img className="order-list-item__image" src={imageUrl} alt={name} />
        <div className="flex-col gap-15">
          <span className="order-name">{name}</span>
          <span className="order-info">
            {price}원 / 수량: {quantity}개
          </span>
        </div>
      </div>
      <button
        className="button button--success flex-center self-start"
        onClick={addToCart}
      >
        장바구니
      </button>
    </div>
  )
}
export default OrderItem
