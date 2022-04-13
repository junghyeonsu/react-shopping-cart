import { useState } from 'react'
import { useQuery } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { getProductList } from '../../api'
import { ProductListPagingResponse } from '../../api/dto'
import './ProductListPage.css'
import ProductPagination from './ProductPagination'

export default function ProductListPage() {
  const [pageOffset, setPageOffset] = useState(1)
  const { isLoading, isError, data } = useQuery<
    AxiosResponse<ProductListPagingResponse>,
    AxiosError
  >(['productList', pageOffset], () => getProductList(pageOffset))

  const handlePageOffsetButton = (num: number) => {
    setPageOffset(num)
  }

  if (isLoading) return <div>로딩중</div>
  if (isError) return <div>요청 중 에러가 발생하였습니다</div>
  if (!data) return <div>나중에 다시 접속해주세요</div>

  return (
    <section>
      <ProductPagination
        products={data.data.products}
        size={data.data.pageSize}
        offset={pageOffset}
        onClickOffsetButton={handlePageOffsetButton}
      />
    </section>
  )
}
