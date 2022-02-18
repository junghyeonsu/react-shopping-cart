import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  position: relative;
`

const CartIconButton = styled.button`
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

const ItemInfo = styled.div`
  width: 282px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
`

const Desc = styled.div`
  margin-top: 1.1rem;
  color: ${({ theme }) => theme.color.gray600};
`

const Name = styled.p`
  font-size: 1rem;
  width: 207px;
  margin-bottom: 5px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Price = styled.p`
  font-size: 1.25rem;
`

export default { Container, CartIconButton, ItemInfo, Desc, Name, Price }
