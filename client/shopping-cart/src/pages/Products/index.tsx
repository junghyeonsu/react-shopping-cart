import styled from '@emotion/styled';

import Product from './components/Product';

import PRODUCTS from '../../fixtures/products';

export default function Products() {
  const { response } = PRODUCTS;

  return (
    <Container>
      {response.map((product) => <Product key={product.id} product={product} />)}
    </Container>
  );
}

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 47px 27px;
  padding: 60px 30px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
