import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemAllChecked } from '../../core/redux/store'
import TrashImageUrl from '../../assets/svgs/trash.svg?url'
import {
  CartItem,
  decreaseProductQuantity,
  increaseProductQuantity,
  toggleProduct,
  changeAllProductChecked,
  deleteCartItems,
  deleteSelectedCartItems,
} from '../../core/redux/slice/cart'
import { cartApi } from '../../core/redux/api'

const CartItemListSection = ({ cartItems }: CartItemListSectionProps) => {
  const allCartItemSelected = useSelector(getCartItemAllChecked)
  const dispatch = useDispatch()

  const increaseProductQuntityHandler = (productId: number) => () => {
    dispatch(increaseProductQuantity({ productId }))
  }
  const decreaseProductQuantityHandler = (productId: number) => () => {
    dispatch(decreaseProductQuantity({ productId }))
  }
  const toggleProductChekced = (productId: number) => () => {
    dispatch(toggleProduct({ productId: productId }))
  }

  const changeAllProductCheck = () => {
    dispatch(changeAllProductChecked({ check: !allCartItemSelected }))
  }

  const onProductDelete = (cartItem: CartItem) => () => {
    const isDeleteProductConfirmed = confirm(cartItem.product.name + ' 상품을 장바구니에서 삭제할까요?')

    if (!isDeleteProductConfirmed) {
      return
    }

    cartApi.deleteCartItem([cartItem.id])
    dispatch(deleteCartItems({ productIds: [cartItem.id] }))
  }

  const onSelectedProductDelete = () => {
    dispatch(deleteSelectedCartItems())
  }

  return (
    <CartItemListSectionContainer>
      <div className="flex justify-between items-center mt-20">
        <div className="checkbox-container">
          <input id="toggle-all" className="checkbox" type="checkbox" checked={allCartItemSelected} onChange={changeAllProductCheck} />
          <label className="checkbox-label" htmlFor="toggle-all">
            선택해제
          </label>
        </div>
        <DeleteButton onClick={onSelectedProductDelete}>상품삭제</DeleteButton>
      </div>
      <h3
        css={css`
          font-size: 20px;
          display: flex;
          align-items: center;
        `}
      >
        든든배송 상품({cartItems.length}개)
      </h3>
      <hr className="divide-line-gray mt-10" />

      {cartItems.map((cartItem, index) => (
        <div key={'cartItem-' + cartItem.id}>
          <CartItemContainer>
            <div className="flex gap-15 mt-10">
              <input className="checkbox" name="checkbox" type="checkbox" onChange={toggleProductChekced(cartItem.id)} checked={cartItem.isChecked} />
              <img className="w-144 h-144" src={cartItem.product.imageUrl} alt="PET보틀-정사각(420ml)" />
              <span className="cart-name">{cartItem.product.name}</span>
            </div>
            <div className="flex-col-center justify-end gap-15">
              <img
                className="cart-trash-svg"
                css={css`
                  cursor: pointer;
                `}
                onClick={onProductDelete(cartItem)}
                src={TrashImageUrl}
                alt="삭제"
              />
              <div className="number-input-container">
                <input type="number" className="number-input" value={cartItem.quantity} readOnly />
                <div>
                  <button className="number-input-button" onClick={increaseProductQuntityHandler(cartItem.id)}>
                    ▲
                  </button>
                  <button className="number-input-button" onClick={decreaseProductQuantityHandler(cartItem.id)}>
                    ▼
                  </button>
                </div>
              </div>
              <span className="cart-price">{(cartItem.product.price * cartItem.quantity).toLocaleString()}원</span>
            </div>
          </CartItemContainer>
          {cartItems.length !== index + 1 && <hr className="divide-line-thin mt-10" />}
        </div>
      ))}
    </CartItemListSectionContainer>
  )
}
const CartItemListSectionContainer = styled.section`
  width: 60%;
`

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const DeleteButton = styled.button`
  padding: 12px 22px;
  border: 1px solid #bbbbbb;
  cursor: pointer;
`

interface CartItemListSectionProps {
  cartItems: CartItem[]
}

export default CartItemListSection
