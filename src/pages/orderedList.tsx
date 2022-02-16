import Header from '@/modules/header'
import OrderedList from '@/components/ordered'

const OrderedListPage = () => {
  return (
    <section className="page">
      <Header title="주문 목록" />
      <OrderedList />
    </section>
  )
}

export default OrderedListPage
