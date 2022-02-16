import { Fragment } from 'react'
import { useGetCarts } from '@/api'
import { getTotalPrice, getTotalQuantity, localeNumber } from '@/utils'
import EmptyPage from '@/modules/emptyPage'
import OrderConfirmItem from './orderItem'

const OrderConfirm = () => {
  const { data } = useGetCarts()

  if (!data)
    return (
      <EmptyPage
        description="결제할 상품이 없어요."
        backTo="/"
        buttonText="홈으로"
      />
    )

  const totalQuantity = getTotalQuantity(data)
  const totalPrice = localeNumber(getTotalPrice(data))

  return (
    <div className="contents flex">
      <section className="order-left-section">
        <h3 className="order-title">주문 상품({totalQuantity}건)</h3>

        {data.map((product, i) => (
          <Fragment key={i}>
            <hr className={`divide-line-${i === 0 ? 'gray' : 'thin'} mt-10`} />
            <OrderConfirmItem {...product} />
          </Fragment>
        ))}
        <hr className="divide-line-thin mt-10" />
      </section>

      <section className="order-right-section">
        <div className="order-right-section__top">
          <h3 className="order-title">결제금액</h3>
        </div>
        <hr className="divide-line-thin" />
        <div className="order-right-section__bottom">
          <div className="flex justify-between p-20 mt-20">
            <span className="highlight-text">총 결제금액</span>
            <span className="highlight-text">{totalPrice}원</span>
          </div>
          <div className="flex-center mt-30 mx-10">
            <button className="primary-button flex-center">
              {totalPrice}원 결제하기
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderConfirm
