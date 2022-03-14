import { SyntheticEvent } from 'react'
import { Product } from '@/dto'
import { localeNumber } from '@/utils'
import useModal from '@/hooks/useModal'
import Link from '@/modules/link'
import classNames from 'classnames'

const ProductItem = ({
  item,
  item: { id, price, name, imageUrl, createdAt },
  productId,
  hideButton = false,
}: {
  item: Product
  productId: string
  hideButton: boolean
}) => {
  const { setModal } = useModal()
  const addToCart = (e: SyntheticEvent) => {
    e.stopPropagation()
    setModal('cart_add', item)
  }
  const pId = id || productId || ''
  const isDeleted = !createdAt

  return (
    <div className={classNames('product-item', { deleted: isDeleted })}>
      <Link className="product-item__image" to={`/products/${pId}`}>
        <img src={imageUrl} alt={name} />
      </Link>
      <div className="flex justify-between p-5">
        <Link to={`/products/${pId}`}>
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
