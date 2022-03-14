import InfiniteList from '@/modules/infiniteList'
import ProductItem from './item'
import { QueryKeys, useGetProductList } from '@/api'

const ProductList = () => (
  <InfiniteList
    wrapperClass="product-container"
    Item={ProductItem}
    queryKey={QueryKeys.products}
    useFetch={useGetProductList}
    empty={{
      description: '목록이 비었습니다.',
    }}
  />
)

export default ProductList
