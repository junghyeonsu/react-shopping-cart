import { Link } from 'react-router-dom'

import CartIcon from '$components/icons/CartIcon'
import ROUTES from '$constants/routes'
import { Product } from '$types/dto'
import formatPrice from '$utils/formatPrice'

interface ProductItemProps {
  product: Product
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div>
      <img className="w-280" src={product.imageUrl} alt={product.name} />
      <div className="flex justify-between w-280 p-5">
        <div className="product-info">
          <span className="product-info__name">{product.name}</span>
          <span className="product-info__price">{formatPrice(product.price)}</span>
        </div>
        <Link to={ROUTES.CART}>
          <CartIcon />
        </Link>
      </div>
    </div>
  )
}
