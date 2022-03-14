import { useParams } from 'react-router-dom'
import { useGetOrder } from '@/api'
import Header from '@/modules/header'
import OrdersDetails from '@/components/orders/details'
import PaymentInfo from '@/components/orders/paymentInfo'

const OrderDetailPage = () => {
  const { id } = useParams()
  const { data } = useGetOrder(id as string)
  if (!data || !id) return null

  return (
    <section className="page">
      <Header title="주문내역상세" />
      <div className="contents">
        <OrdersDetails item={data} />
        <PaymentInfo details={data.orderDetails} />
      </div>
    </section>
  )
}
export default OrderDetailPage
