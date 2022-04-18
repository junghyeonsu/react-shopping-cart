import styled from '@emotion/styled'
import { productEndPoint, ProductPageProductData } from '../../core/redux/service/product'
import CartImageUrl from '../../assets/svgs/cart.svg?url'
import { toast } from 'react-toastify'
import { useAddCartMutation } from '../../core/redux/service/cart'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

const ProductCard = ({ product }: { product: ProductPageProductData }) => {
  const { name, price, imageUrl, isCartEntered } = product
  const [addCart] = useAddCartMutation()
  const navigate = useNavigate()

  const onAddCartItem = () => {
    productEndPoint.util.updateQueryData('productList', 1, (productList) => {
      const target = productList.data.find((product) => product.id === product.id)

      if (!target) {
        return
      }
      target.isCartEntered = true
    })
    toast(`${product.name} 상품을 카트에 담았어요.`)
    addCart(product)
  }

  return (
    <CardContainer>
      <ProductImage
        css={css`
          cursor: pointer;
        `}
        onClick={() => navigate('/productDetail?productId=' + product.id)}
        src={imageUrl}
        alt={name ?? '상품 이미지'}
      />
      <ProductBottomContainer>
        <ProductInfoContainer>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price}</ProductPrice>
        </ProductInfoContainer>

        {!isCartEntered && (
          <CartImageContainer onClick={onAddCartItem}>
            <CartImage src={CartImageUrl} />
          </CartImageContainer>
        )}
      </ProductBottomContainer>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductImage = styled.img`
  max-width: 290px;
`

const ProductBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  width: 280px;
`

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ProductName = styled.span`
  font-size: 12px;
`

const ProductPrice = styled.span`
  font-size: 16px;
`
const CartImageContainer = styled.div`
  display: flex;
  flex-direction: center;
  align-items: center;

  cursor: pointer;
`

const CartImage = styled.img`
  width: 24px;
  height: 24px;
`

export default ProductCard
