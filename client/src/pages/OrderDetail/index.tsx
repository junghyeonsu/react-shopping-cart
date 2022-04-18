import { css } from '@emotion/react'
import { useSearchParams } from 'react-router-dom'
import OrderCard from '../../components/Order/OrderCard'
import PageHeader from '../../components/Header/PageHeader'
import { useOrderDetailQuery } from '../../core/redux/service/order'

const OrderDetail = () => {
  let [searchParams] = useSearchParams()
  const { data: order, isLoading } = useOrderDetailQuery(Number(searchParams.get('orderId')))

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!order) {
    return <div>주문 정보가 없어요.</div>
  }

  return (
    <div
      css={css`
        padding: 50px 240px;
      `}
    >
      <PageHeader title="주문내역상세" />
      <div className="mt-40" />
      <OrderCard order={order} />
      <div className="mt-40" />
      <div
        css={css`
          float: right;
        `}
      >
        <div
          className="flex-col"
          css={css`
            width: 495px;
          `}
        >
          <span
            css={css`
              font-size: 28px;
              font-weight: 700;
            `}
          >
            결제금액 정보
          </span>
          <hr className="divide-line-gray mt-10" />
          <div className="flex justify-between mt-40">
            <span className="highlight-text">총 결제금액</span>
            <span className="highlight-text">
              {order.orderDetails
                .map((orderDetail) => orderDetail.price)
                .reduce((prev, cur) => prev + cur, 0)
                .toLocaleString()}
              원
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
