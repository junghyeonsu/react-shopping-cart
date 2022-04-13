import { Product } from 'api/dto'

interface Props {
  products: Product[]
  size: number
  offset: number
  onClickOffsetButton: (num: number) => void
}

export default function ProductPagination({ products, size, offset, onClickOffsetButton }: Props) {
  const handleClick = (num: number) => () => {
    onClickOffsetButton(num + 1)
  }

  if (products.length === 0) {
    return <div className="product-container">텅</div>
  }

  return (
    <>
      <div className="product-container">
        {products.map(({ id, imageUrl, name, price }) => {
          return (
            <div key={id} data-testid="product-info">
              <img width="280px" src={imageUrl} alt={name} />
              <div className="flex justify-between w-280 p-5">
                <div className="product-info">
                  <span className="product-info__name">{name}</span>
                  <span className="product-info__price">{price}원</span>
                </div>
                <img src="assets/svgs/cart.svg" alt="장바구니" />
              </div>
            </div>
          )
        })}
      </div>
      <div className="product-pagesize__container">
        {[...Array(size).keys()].map((num) => (
          <button
            key={`pagesize-button-${num}`}
            className={`product-pagesize__button ${
              offset === num + 1 ? 'product-pagesize__active' : ''
            }`}
            onClick={handleClick(num)}
            data-testid="pagesize-button"
          >
            {num + 1}
          </button>
        ))}
      </div>
    </>
  )
}
