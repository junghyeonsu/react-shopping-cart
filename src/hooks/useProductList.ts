import { RefObject, useEffect } from 'react'
import { queryClient, QueryKeys, useGetProductList } from '@/api'
import useInfiniteScroll from './useInfiniteScroll'

const useProductList = (fetchMoreEl: RefObject<HTMLDivElement | null>) => {
  const { intersecting } = useInfiniteScroll(fetchMoreEl)
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetProductList()

  useEffect(() => {
    if (intersecting && hasNextPage) fetchNextPage()
  }, [intersecting, hasNextPage])

  useEffect(() => {
    return () => {
      queryClient.cancelQueries(QueryKeys.products)
    }
  }, [])

  return { data, isLoading, isFetchingNextPage }
}

export default useProductList
