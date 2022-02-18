import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { GNB_HEIGHT } from '../../constants/layout'

const Container = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  height: ${GNB_HEIGHT}px;
  box-shadow: 2px 1px 2px 1px rgba(0, 0, 0, 0.2);
`

const Inner = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 1320px;
  padding: 0 1.5rem;
  margin: 0 auto;
`

const CartIcon = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 3.2rem;

    &:before {
      display: block;
      padding-top: ${(44 * 100) / 51}%;
    }
  }
`

const H1 = styled.h1`
  color: ${({ theme }) => theme.color.white};
  font-weight: 900;
  font-size: 2.5rem;
  padding-left: 1rem;
`

const NavigationItem = styled(Link)`
  color: ${({ theme }) => theme.color.white};
  margin-left: 2.7rem;
  font-weight: 500;
  font-size: 1.5rem;
`

export default { Container, Inner, CartIcon, H1, NavigationItem }
