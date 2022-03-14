import CartForm from '@/components/cart'
import Header from '@/modules/header'

const ShoppingCartPage = () => (
  <section className="page">
    <Header title="장바구니" />
    <CartForm />
  </section>
)

export default ShoppingCartPage
