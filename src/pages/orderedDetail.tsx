import { useParams } from 'react-router-dom'
import { useGetOrder } from '@/api'
import Header from '@/modules/header'
import OrderedDetails from '@/components/ordered/details'
import PaymentInfo from '@/components/ordered/paymentInfo'

const OrderedDetailPage = () => {
  const { id } = useParams()
  const { data } = useGetOrder(id as string)
  if (!data || !id) return null

  return (
    <section className="page">
      <Header title="주문내역상세" />
      <div className="contents">
        <OrderedDetails {...data} />
        <PaymentInfo details={data.orderDetails} />
      </div>
    </section>
  )
}
export default OrderedDetailPage
