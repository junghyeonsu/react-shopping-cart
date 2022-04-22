import styled from '@emotion/styled';

import { ProductType } from '../../../fixtures/products';

// @ts-ignore
import { ReactComponent as CartIcon } from '../../../assets/svgs/cart_icon.svg';

type Props = {
  product: ProductType
}

export default function Product({ product }: Props) {
  const { name, price, imageUrl } = product;

  return (
    <Container>
      <Header>
        <img src={imageUrl} alt="product" />
      </Header>
      <Footer>
        <FooterLeft>
          <p>{name}</p>
          <p>
            {price}
            {' '}
            원
          </p>
        </FooterLeft>
        <FooterRight type="button" title="cart">
          <CartIcon />
        </FooterRight>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  
`;

const Header = styled.div`
  & > img {
    width: 100%;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLeft = styled.div`
  & > p:first-of-type {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.5px;
  }

  & > p:last-of-type {
    font-size: 20px;
    line-height: 27px;
    letter-spacing: 0.5px;
  }
`;

const FooterRight = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  
  > & img {
    width: 30px;
    height: 26px;
  }
`;
