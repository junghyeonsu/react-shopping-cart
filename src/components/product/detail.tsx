import { Product } from '@/dto'
import useModal from '@/hooks/useModal'
import { localeNumber } from '@/utils'
import { SyntheticEvent } from 'react'

const ProductDetail = ({
  item,
  item: { name, imageUrl, price },
}: {
  item: Product
}) => {
  const { setModal } = useModal()
  const addToCart = (e: SyntheticEvent) => {
    e.stopPropagation()
    setModal('cart_add', item)
  }

  return (
    <div className="contents product-detail-container">
      <div className="flex-col-center w-520">
        <img className="w-480 h-480 mb-10" src={imageUrl} alt={name} />
        <div className="product-detail-info">
          <span className="product-detail-info__name">{name}</span>
          <hr className="divide-line-gray my-20" />
          <div className="flex justify-between">
            <span>금액</span>
            <span className="product-detail-info__price">
              {localeNumber(price)}원
            </span>
          </div>
        </div>
        <button
          className="product-detail-button flex-center mt-20"
          onClick={addToCart}
        >
          장바구니
        </button>
      </div>
    </div>
  )
}
export default ProductDetail
