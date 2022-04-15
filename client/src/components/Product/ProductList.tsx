import styled from '@emotion/styled'
import { Product } from 'src/types/dto'
import ProductCard from './ProductCard'

const ProductCardList = ({ products }: { products: Product[] }) => {
  return (
    <ProductCardContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductCardContainer>
  )
}

const ProductCardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
export default ProductCardList
