import Link from '@/modules/link'
import { Order } from '@/dto'
import OrderItem from './item'
import { getDateString } from '@/utils'

const OrderDetails = ({
  item: { id, orderDetails, createdAt },
  showButton,
}: {
  item: Order
  showButton?: boolean
}) => (
  <div className="order-list" key={`orderList_${id}`}>
    <div className="order-list__header">
      <div>
        <div>{getDateString(createdAt)}</div>
        <div>ID: {id}</div>
      </div>
      {showButton && <Link to={`/orders/${id}`}>상세보기 &gt;</Link>}
    </div>
    {orderDetails.map((item, i) => (
      <OrderItem {...item} key={`${item.productId}_${i}`} />
    ))}
  </div>
)

export default OrderDetails
