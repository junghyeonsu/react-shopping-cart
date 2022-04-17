import styled from '@emotion/styled'
import PageHeader from '../../components/Header/PageHeader'
import SubmitCartItemSection from './SubmitCartItemSection'
import SubmitOrderSection from './SubmitOrderSection'

const CartSubmit = () => {
  return (
    <SubmitSection>
      <PageHeader title="주문/결제" />
      <div className="detail-container">
        <SubmitCartItemSection />
        <SubmitOrderSection />
      </div>
    </SubmitSection>
  )
}

const SubmitSection = styled.section`
  padding: 24px 300px;

  .detail-container {
    display: flex;
  }
`

export default CartSubmit
