import { css } from '@emotion/react'
import OrderCard from '../../components/Order/OrderCard'
import PageHeader from '../../components/Header/PageHeader'
import { useOrderListQuery } from '../../core/redux/service/order'

const OrderList = () => {
  const { data: orders, isLoading } = useOrderListQuery()

  if (isLoading || !orders) {
    return <div>Loading...</div>
  }

  return (
    <div
      css={css`
        padding: 50px 240px;
      `}
    >
      <PageHeader title="주문목록" />
      <div
        css={css`
          margin-bottom: 55px;
        `}
      />
      {orders.map((order, index) => (
        <div key={order.id}>
          <OrderCard order={order} enableShowDetail />
          {orders.length !== index - 1 && (
            <div
              css={css`
                margin-bottom: 74px;
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default OrderList
