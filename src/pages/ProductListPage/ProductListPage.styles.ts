import styled from 'styled-components'
import { PRODUCT_LIST_PAGE_LAYOUT } from '../../constants/layout'

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: ${PRODUCT_LIST_PAGE_LAYOUT.PADDING_TOP}px 24px 0;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 282px);
  gap: ${PRODUCT_LIST_PAGE_LAYOUT.PRODUCT_LIST_ITEM_GRID_GAP}px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(3, 282px);
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 282px);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 282px);
  }
`

export default { Container }
