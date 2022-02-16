import Header from '@/modules/header'
import ProductList from '@/components/product'

const ProductListPage = () => (
  <section className="page">
    <Header title="상품 목록" />
    <ProductList />
  </section>
)

export default ProductListPage
