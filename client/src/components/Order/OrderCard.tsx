import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import colors from '../../constants/colors'
import { useAddCartMutation } from '../../core/redux/service/cart'
import { Order, OrderDetail } from '../../types/dto'

const OrderCard = ({ order, enableShowDetail = false }: OrderCardProps) => {
  const [cartModalOpen, setCartmodalOpen] = useState(false)
  const navigate = useNavigate()
  const [addCart] = useAddCartMutation()

  const addCartItem = ({ quantity, ...rest }: OrderDetail) => {
    addCart({ ...rest })
  }

  return (
    <div>
      <div
        className="flex items-center justify-between"
        css={css`
          height: 92px;
          padding: 0 25px;
          background-color: ${colors.white200};
          border: 1px solid ${colors.black250};
        `}
      >
        <CartHeaderText>주문번호: {order.id}</CartHeaderText>
        {enableShowDetail && (
          <CartHeaderText data-testid={'상세보기-버튼'} onClick={() => navigate('/orderDetail?orderId=' + order.id)}>
            상세보기 {'>'}
          </CartHeaderText>
        )}
      </div>
      {order.orderDetails.map((orderDetail) => (
        <OrderDetailCard
          key={order.id + '-' + orderDetail.id}
          orderDetail={orderDetail}
          setCartmodalOpen={setCartmodalOpen}
          onCartButtonClick={addCartItem}
        />
      ))}

      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            width: '400px',
            height: '200px',
          },
        }}
        isOpen={cartModalOpen}
      >
        <div className="flex-col">
          <h3
            css={css`
              font-size: 24px;
              margin: 0;
            `}
          >
            장바구니 이동
          </h3>
          <hr className="divide-line-thin" />
          <span
            className="mt-30"
            css={css`
              font-size: 16px;
            `}
          >
            상품을 카트에 담았어요. 장바구니로 이동할까요?
          </span>
          <div className="mt-30 flex flex-center">
            <ModalButton className="mr-20" onClick={() => setCartmodalOpen(false)}>
              아니요
            </ModalButton>
            <ModalButton
              isConfirm
              onClick={() => {
                setCartmodalOpen(false)
                navigate('/cart')
              }}
            >
              이동할래요
            </ModalButton>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const OrderDetailCard = ({ orderDetail, setCartmodalOpen, onCartButtonClick }: OrderDetailCardProps) => {
  return (
    <div
      css={css`
        display: 'flex';
        padding: 38px 25px;
        border: 1px solid ${colors.black250};
      `}
    >
      <div className="flex justify-between">
        <div className="flex">
          <ProductImage src={orderDetail.imageUrl} />
          <div className="flex-col">
            <span
              css={css`
                font-size: 24px;
                margin-bottom: 12px;
              `}
            >
              {orderDetail.name}
            </span>
            <span
              css={css`
                font-size: 20px;
                color: ${colors.black400};
              `}
            >
              {orderDetail.price.toLocaleString()}원 / 수량: {orderDetail.quantity}개
            </span>
          </div>
        </div>
        <div
          css={css`
            width: 138px;
            height: 47px;
          `}
        >
          <CartButton
            onClick={() => {
              setCartmodalOpen(true)
              onCartButtonClick(orderDetail)
            }}
          >
            장바구니
          </CartButton>
        </div>
      </div>
    </div>
  )
}

interface OrderDetailCardProps {
  orderDetail: OrderDetail
  setCartmodalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCartButtonClick: (orderDetail: OrderDetail) => void
}

interface OrderCardProps {
  order: Order
  enableShowDetail?: boolean
}

const CartHeaderText = styled.span`
  font-size: 20px;
  font-weight: 400;
`

const ProductImage = styled.img`
  width: 141px;
  height: 141px;
  margin-right: 33px;
`

const CartButton = styled.button`
  background: ${colors.primary};
  font-size: 20px;
  color: white;
  padding: 14px 28px;
  border: none;
  cursor: pointer;
`

const ModalButton = styled.button<{ isConfirm?: boolean }>`
  background: ${(props) => (props.isConfirm ? colors.primary : colors.black100)};
  cursor: pointer;
  font-size: 24px;
  color: white;
  width: 150px;
  height: 60px;
  padding: 20px;
  border: none;
`

export default OrderCard
