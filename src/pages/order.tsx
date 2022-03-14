import OrderConfirm from '@/components/order'
import Header from '@/modules/header'

const OrderPage = () => {
  return (
    <section className="page">
      <Header title="주문/결제" />
      <OrderConfirm />
    </section>
  )
}
export default OrderPage
