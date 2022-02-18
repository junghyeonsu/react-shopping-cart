import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import productsAction from '../../redux/products/productsAction'
import { productsSelector } from '../../redux/products/productsSelector'
import ProductListItemCountContext from '../../contexts/ProductListItemCountContext'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import ProductItem from '../../components/ProductItem'
import { GNB_HEIGHT } from '../../constants/layout'
import PATH from '../../constants/path'
import Styled from './ProductListPage.styles'

const ProductListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(productsSelector)
  const { itemCount } = useContext(ProductListItemCountContext)

  const [page, setPage] = useState(1)
  const [isLastPage, setIsLastPage] = useState(false)

  const updatePage = () => {
    if (page * itemCount >= products.length) {
      setIsLastPage(true)
    } else {
      setPage((prev) => prev + 1)
    }
  }

  const handleClickCartButton = () => {
    navigate(PATH.CART)
  }

  useEffect(() => {
    dispatch(productsAction.requestGetProducts())
  }, [])

  return (
    <InfiniteScroll updatePage={updatePage} isLastPage={isLastPage} height={window.innerHeight - GNB_HEIGHT}>
      <Styled.Container>
        {products.slice(0, page * itemCount).map((product) => (
          <ProductItem key={product.id} id={product.id} onClickCart={handleClickCartButton} />
        ))}
      </Styled.Container>
    </InfiniteScroll>
  )
}

export default ProductListPage
