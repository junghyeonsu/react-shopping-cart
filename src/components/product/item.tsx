import { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '@/dto'
import { localeNumber } from '@/utils'

const ProductItem = ({
  item,
  item: { id, price, name, imageUrl },
  showModal,
  hideButton = false,
}: {
  item: Product
  showModal?: (item: Product) => void
  hideButton: boolean
}) => {
  const addToCart = (e: SyntheticEvent) => {
    e.stopPropagation()
    showModal && showModal(item)
  }

  return (
    <div className="product-item">
      <Link to={`/products/${id}`}>
        <img src={imageUrl} alt={name} />
      </Link>
      <div className="flex justify-between p-5">
        <Link to={`/products/${id}`}>
          <div className="product-info">
            <span className="product-info__name">{name}</span>
            <span className="product-info__price">{localeNumber(price)}원</span>
          </div>
        </Link>
        {!hideButton && (
          <button onClick={addToCart}>
            <img src="/assets/svgs/cart.svg" alt="장바구니" />
          </button>
        )}
      </div>
    </div>
  )
}
export default ProductItem
