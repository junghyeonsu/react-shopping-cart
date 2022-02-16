import InfiniteList from '@/modules/infiniteList'
import useCartModal from '@/hooks/useCartModal'
import useProductList from '@/hooks/useProductList'
import ProductItem from './item'

const ProductList = () => {
  const { modalComponent, showModal } = useCartModal()

  return (
    <>
      <InfiniteList
        wrapperClass="product-container"
        fetcher={useProductList}
        Item={ProductItem}
        showModal={showModal}
        empty={{
          description: '목록이 비었습니다.',
        }}
      />
      {modalComponent}
    </>
  )
}

export default ProductList
