import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { getCartSubmitItems } from '../../core/redux/store'
const SubmitCartItemSection = () => {
  const submitItems = useSelector(getCartSubmitItems)

  return (
    <SubmitCartItemSectionContainer>
      <h3
        css={css`
          font-size: 20px;
          display: flex;
          align-items: center;
        `}
      >
        주문 상품({submitItems.length}건)
      </h3>
      <hr className="divide-line-gray mt-10" />

      {submitItems.map((submitItem) => (
        <div key={'submitItem-' + submitItem.id}>
          <SubmitCartItemContainer>
            <div className="flex gap-15 mt-10">
              <img
                css={css`
                  width: 120px;
                  height: 120px;
                `}
                src={submitItem.product.imageUrl}
                alt="PET보틀-정사각(420ml)"
              />
              <div className="flex-col">
                <span
                  css={css`
                    font-size: 20px;
                    font-weight: 400;
                    margin-bottom: 15px;
                  `}
                  className="cart-name"
                >
                  {submitItem.product.name}
                </span>
                <span
                  css={css`
                    font-size: 16px;
                    font-weight: 400;
                  `}
                  className="cart-name"
                >
                  수량: {submitItem.quantity}
                </span>
              </div>
            </div>
          </SubmitCartItemContainer>
        </div>
      ))}
    </SubmitCartItemSectionContainer>
  )
}
const SubmitCartItemSectionContainer = styled.section`
  width: 60%;
`

const SubmitCartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export default SubmitCartItemSection
