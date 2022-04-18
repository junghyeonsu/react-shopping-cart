import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useNavigate, useSearchParams } from 'react-router-dom'
import colors from '../../constants/colors'
import { useProductDetailQuery } from '../../core/redux/service/product'
import { useAddCartMutation } from '../../core/redux/service/cart'

const ProductDetail = () => {
  let [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [addCart] = useAddCartMutation()

  const { data: product, isLoading } = useProductDetailQuery(Number(searchParams.get('productId')))

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!product) {
    return <div>상품 정보가 없어요.</div>
  }

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        className="flex-col"
        css={css`
          width: 638px;
        `}
      >
        <div
          className="flex-col"
          css={css`
            padding: 0 20px;
          `}
        >
          <img
            className="mt-60"
            css={css`
              width: 570px;
              height: 570px;
            `}
            src={product.imageUrl}
            alt={product.name ?? '상품 이미지'}
          />
          <span
            className="mt-20"
            css={css`
              font-weight: 700;
              font-size: 32px;
            `}
          >
            {product.name}
          </span>
        </div>
        <hr className="divide-line-gray mt-30" />
        <div
          className="flex-col"
          css={css`
            padding: 0 20px;
          `}
        >
          <div className="flex justify-between mt-20">
            <span
              css={css`
                font-size: 24px;
              `}
            >
              금액
            </span>
            <span
              css={css`
                font-size: 32px;
              `}
            >
              {product.price.toLocaleString()}원
            </span>
          </div>
          <CartButton
            onClick={() => {
              addCart(product)
              navigate('/cart')
            }}
          >
            장바구니
          </CartButton>
        </div>
      </div>
    </div>
  )
}

const CartButton = styled.button`
  background: ${colors.primary};
  font-size: 24px;
  color: white;
  width: 100%;
  padding: 20px 0;
  margin-top: 57px;
  border: none;
  cursor: pointer;
`

export default ProductDetail
