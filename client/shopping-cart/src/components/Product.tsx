import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usePostCarts } from "../api/cart";
import { ReactComponent as CartIcon } from "../assets/svgs/cart_icon.svg";
import { addProduct } from "../store/slices/cart";
import type { ProductType } from "../types";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const { id, name, price, imageUrl } = product;
  const { mutate: postProductInCart } = usePostCarts({ product });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveCartsPage = () => {
    dispatch(addProduct({ quantity: 1, ...product }));
    postProductInCart();
    navigate(`/carts`, {
      state: {
        product,
      },
    });
  };

  const moveProductDetailPage = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <Header onClick={moveProductDetailPage}>
        <img src={imageUrl} alt="product" />
      </Header>
      <Footer>
        <FooterLeft onClick={moveProductDetailPage}>
          <p>{name}</p>
          <p>{price} 원</p>
        </FooterLeft>
        <FooterRight type="button" title="cart" onClick={moveCartsPage}>
          <CartIcon />
        </FooterRight>
      </Footer>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  & > img {
    width: 100%;
  }

  :hover {
    cursor: pointer;
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

  :hover {
    cursor: pointer;
  }
`;

const FooterRight = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }

  > & img {
    width: 30px;
    height: 26px;
  }
`;
