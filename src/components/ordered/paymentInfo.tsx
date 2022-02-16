import { OrderDetail } from '@/dto'
import { getTotalPrice, localeNumber } from '@/utils'

const PaymentInfo = ({ details }: { details: OrderDetail[] }) => {
  const totalPrice = localeNumber(getTotalPrice(details))

  return (
    <div className="order-detail-container">
      <div className="w-480">
        <span className="order-detail-title">결제금액 정보</span>
        <hr className="divide-line-thin my-20" />
        <div className="flex justify-between">
          <span className="highlight-text">총 결제금액</span>
          <span className="highlight-text">{totalPrice}원</span>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
