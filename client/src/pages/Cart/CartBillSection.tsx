import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { submitCartItems } from '../../core/redux/slice/cart'
import colors from '../../constants/colors'
import { getCartCheckedProductCount, getCartItemTotalPrice } from '../../core/redux/store'
import { useNavigate } from 'react-router-dom'

const CartBillSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const totalPrice = useSelector(getCartItemTotalPrice)
  const selectedCartItemLength = useSelector(getCartCheckedProductCount)

  const onSubmitCartItems = () => {
    const submitCartItemsConfirmed = confirm(selectedCartItemLength + '개의 상품을 주문할까요?')

    if (!submitCartItemsConfirmed) {
      return
    }

    dispatch(submitCartItems())
    navigate('/cartSubmit')
  }

  return (
    <CartBillSectionContainer>
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 16px 30px;
        `}
      >
        <h3
          css={css`
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: 400;
          `}
        >
          결제예상금액
        </h3>
      </div>
      <hr className="divide-line-thin" />
      <div>
        <div className="flex justify-between p-20 mt-20">
          <span className="highlight-text">결제예상금액</span>
          <span className="highlight-text">{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex-center mt-30 mx-10">
          <SubmitOrderButton className="flex-center" disabled={selectedCartItemLength === 0} onClick={onSubmitCartItems}>
            주문하기({selectedCartItemLength}개)
          </SubmitOrderButton>
        </div>
      </div>
    </CartBillSectionContainer>
  )
}
const SubmitOrderButton = styled.button`
  background: #2ac1bc;
  font-size: 24px;
  color: white;
  width: 100%;
  padding: 20px;
  border: none;

  &:disabled {
    background-color: ${colors.black100};
  }
`

const CartBillSectionContainer = styled.section`
  width: 35%;
  height: 330px;
  margin-left: 5%;
  margin-top: 80px;
  border: 1px solid ${colors.black200};
`
export default CartBillSection
