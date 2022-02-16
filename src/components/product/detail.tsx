import { Product } from '@/dto'
import useCartModal from '@/hooks/useCartModal'
import { localeNumber } from '@/utils'

const ProductDetail = ({
  item,
  item: { name, imageUrl, price },
}: {
  item: Product
}) => {
  const { modalComponent, showModal } = useCartModal()

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
          onClick={() => showModal(item)}
        >
          장바구니
        </button>
      </div>
      {modalComponent}
    </div>
  )
}
export default ProductDetail
