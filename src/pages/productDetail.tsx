import { useParams } from 'react-router-dom'
import EmptyPage from '@/modules/emptyPage'
import Header from '@/modules/header'
import ProductDetail from '@/components/product/detail'
import { useGetProduct } from '@/api'
import LoadingIndicator from '@/modules/loadingIndicator'

const ProductDetailPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetProduct(id as string)

  if (isLoading)
    return (
      <section className="page">
        <Header title="상품 상세" />
        <LoadingIndicator isLoading={true} />
      </section>
    )

  if (!data)
    return (
      <EmptyPage
        description="삭제되었거나 없는 상품입니다."
        backTo="/"
        buttonText="홈으로"
      />
    )

  return (
    <section className="page">
      <Header title="상품 상세" />
      <ProductDetail item={data} />
    </section>
  )
}
export default ProductDetailPage
