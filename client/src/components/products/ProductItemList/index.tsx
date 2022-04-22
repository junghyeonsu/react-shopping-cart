import { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'

import ProductItem from '$components/products/ProductItem'
import { fetchProducts, isProductsLoadingSelector, productsSelector } from '$stores/product'

import { useAppDispatch } from '$stores'

export default function ProductItemList() {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(isProductsLoadingSelector)
  const products = useSelector(productsSelector)
  const [count, setCount] = useState(10)

  const displayedProducts = useMemo(() => products.slice(0, count), [products, count])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  if (isLoading) {
    return null
  }

  return (
    <InfiniteScroll
      className="product-container"
      dataLength={displayedProducts.length}
      next={() => {
        setCount(Math.min(products.length, count + 10))
      }}
      hasMore={count !== products.length}
      loader={null}
    >
      {displayedProducts.map((product, index) => (
        <ProductItem product={product} key={`${index}_${product.id}`} />
      ))}
    </InfiniteScroll>
  )
}
