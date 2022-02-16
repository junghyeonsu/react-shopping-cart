import { Link } from 'react-router-dom'
import { Order } from '@/dto'
import OrderItem from './item'

const OrderDetails = ({ id, orderDetails }: Order) => (
  <div className="order-list" key={`orderList_${id}`}>
    <div className="order-list__header">
      <span>주문번호: {id}</span>
      <Link to={`/ordered/${id}`}>상세보기 &gt;</Link>
    </div>
    {orderDetails.map((item, i) => (
      <OrderItem {...item} key={`${item.productId}_${i}`} />
    ))}
  </div>
)

export default OrderDetails
