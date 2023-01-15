import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/logo.png";

export default function Home() {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link to="/">
            <img src={logo} alt="wooma shop" />
            <span>WOOMA SHOP</span>
          </Link>
        </Logo>
        <Nav>
          <li>
            <Link to="/carts">장바구니</Link>
          </li>
          <li>
            <Link to="/orders">주문목록</Link>
          </li>
        </Nav>
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 32px;
  background: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  height: 80px;
`;

const Logo = styled.h1`
  a {
    display: flex;
    align-items: center;
    height: 100%;
    color: white;

    img {
      width: 50px;
      height: 44px;
    }

    span {
      width: 333.83px;
      height: 57px;
      font-weight: 900;
      font-size: 40px;
      text-align: center;
      line-height: 58px;
    }
  }
`;

const Nav = styled.ul`
  display: flex;

  li {
    margin-right: 44px;

    a {
      color: white;
      font-weight: 500;
      font-size: 24px;
      line-height: 12px;
    }
  }
`;
