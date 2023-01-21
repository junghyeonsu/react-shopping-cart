import styled from "@emotion/styled";

import { useProducts } from "../api/product";
import Product from "../components/Product";

export default function ProductsPage() {
  const { data } = useProducts();

  return (
    <Container>
      {data?.pages.map((products) =>
        products.map((product) => <Product key={product.id} product={product} />),
      )}
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