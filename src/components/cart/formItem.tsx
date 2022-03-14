import { usePatchCart, queryClient, QueryKeys } from '@/api'
import { CART_LIMITS } from '@/constants'
import { OrderDetail } from '@/dto'
import { localeNumber } from '@/utils'
import { InfiniteData } from 'react-query'

const CartFormItem = ({
  item: {
    product: { imageUrl, name, price, createdAt },
    productId,
    quantity,
  },
  isChecked,
  toggleChecked,
  handleDelete,
}: {
  item: OrderDetail
  isChecked: (id: string) => boolean
  toggleChecked: (id: string) => () => void
  handleDelete: (id: string) => () => void
}) => {
  const { mutate: patchItem, isLoading: isPatchLoading } = usePatchCart()
  const patchCart = (quantity: number) => {
    if (quantity > CART_LIMITS.max || quantity < CART_LIMITS.min) return
    patchItem(
      { id: productId, quantity },
      {
        onSuccess: newItem => {
          queryClient.setQueryData<InfiniteData<OrderDetail[]>>(
            QueryKeys.cart,
            ({ pageParams, pages } = { pageParams: [], pages: [] }) => {
              let targetIndex = 0
              const targetPage = pages.findIndex(page => {
                const searchedIndex = page.findIndex(
                  item => item.productId === newItem.productId,
                )
                if (searchedIndex > -1) targetIndex = searchedIndex
                return true
              })
              const newPages = [...pages.map(page => [...page])]
              newPages[targetPage][targetIndex] = newItem
              return {
                pageParams,
                pages: newPages,
              }
            },
          )
        },
      },
    )
  }

  if (!createdAt)
    return (
      <div className="cart-container product-item deleted">
        <input className="checkbox" type="checkbox" disabled />
        <div className="product-item__image">
          <img className="cart-image" src={imageUrl} alt={name} />
        </div>
        <span className="cart-name">판매중단</span>
        <div className="justify-end">
          <button
            type="button"
            onClick={productId ? handleDelete(productId) : undefined}
          >
            제거{' '}
            <img
              className="cart-trash-svg"
              src="/assets/svgs/trash.svg"
              alt="삭제"
            />
          </button>
        </div>
      </div>
    )

  return (
    <div className="cart-container">
      <input
        className="checkbox"
        name="checkbox"
        type="checkbox"
        checked={productId ? isChecked(productId) : undefined}
        onChange={productId ? toggleChecked(productId) : undefined}
      />
      <img className="cart-image" src={imageUrl} alt={name} />
      <span className="cart-name">{name}</span>
      <div className="flex-col-center justify-end gap-15">
        <button
          type="button"
          onClick={productId ? handleDelete(productId) : undefined}
        >
          <img
            className="cart-trash-svg"
            src="/assets/svgs/trash.svg"
            alt="삭제"
          />
        </button>
        <div className="number-input-container">
          <input
            type="number"
            className="number-input"
            value={quantity}
            min={1}
            max={20}
            onChange={e => patchCart(+e.target.value)}
          />
          <div>
            <button
              className="number-input-button"
              onClick={() => patchCart(quantity + 1)}
              disabled={isPatchLoading || quantity >= CART_LIMITS.max}
            >
              ▲
            </button>
            <button
              className="number-input-button"
              onClick={() => patchCart(quantity - 1)}
              disabled={isPatchLoading || quantity <= CART_LIMITS.min}
            >
              ▼
            </button>
          </div>
        </div>
        <span className="cart-price">
          {localeNumber(price)}원 x {quantity}개
        </span>
        <span className="cart-price">{localeNumber(price * quantity)}원</span>
      </div>
    </div>
  )
}
export default CartFormItem
