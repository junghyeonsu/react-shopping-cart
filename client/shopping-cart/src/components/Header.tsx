import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

export default function Header() {
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

  gap: 10px;
`;

const Logo = styled.h1`
  a {
    display: flex;
    align-items: center;

    color: white;

    img {
      width: 40px;
      height: 32px;
    }

    span {
      margin-left: 10px;
      font-size: 26px;
      font-weight: 900;
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
      font-size: 20px;
      line-height: 12px;
    }
  }
`;
