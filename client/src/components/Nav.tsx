import styled from '@emotion/styled'
import colors from '../constants/colors'
import RouteButton from './Button/RouteButton'

const Nav = () => {
  return (
    <NavContainer>
      <NavTitleContainer>
        <RouteButton navigateRoute="productList">
          <NavTitle>CLEAN CODE SHOP</NavTitle>
        </RouteButton>
      </NavTitleContainer>
      <NavButtonContainer>
        <RouteButton navigateRoute="cart">
          <NavButton>장바구니</NavButton>
        </RouteButton>
        <RouteButton navigateRoute="orderList">
          <NavButton>주문목록</NavButton>
        </RouteButton>
      </NavButtonContainer>
    </NavContainer>
  )
}

export default Nav

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  background: ${colors.primary};
  box-shadow: 0px 4px 4px rgb(0 0 0 / 30%);
`

const NavTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavButtonContainer = styled.div`
  display: flex;
  gap: 15px;
`

const NavTitle = styled.h1`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
  vertical-align: middle;
  color: ${colors.white500};
`

const NavButton = styled.button`
  all: unset;
  display: revert;
  color: ${colors.white500};
  font-size: 24px;
  font-weight: 500;

  span {
    margin-left: 4px;
    padding: 2px 4px;
    border: 1px solid ${colors.white500};
    border-radius: 4px;
  }
`
