import { queryClient, QueryKeys } from '@/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useEffect, useRef } from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import EmptyPage from './emptyPage'
import LoadingIndicator from './loadingIndicator'

const InfiniteList = <T extends unknown>({
  wrapperClass,
  Item,
  queryKey,
  useFetch,
  empty,
  ...itemProps
}: {
  wrapperClass: string
  Item: (...args: any) => JSX.Element
  queryKey: QueryKeys
  useFetch: () => UseInfiniteQueryResult<T[], unknown>
  empty: {
    description: string
    backTo?: string
    buttonText?: string
  }
  [key: string]: any
}) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetch()
  const fetchMoreEl = useRef<HTMLDivElement | null>(null)
  const { intersecting } = useInfiniteScroll(fetchMoreEl)
  const fetchMore = <div className="fetch-more" ref={fetchMoreEl} />

  useEffect(() => {
    if (intersecting && hasNextPage) fetchNextPage()
  }, [intersecting, hasNextPage])

  useEffect(() => {
    return () => {
      queryClient.cancelQueries(queryKey)
    }
  }, [])

  if (isLoading)
    return (
      <>
        <LoadingIndicator isLoading={true} />
        {fetchMore}
      </>
    )
  if (!data)
    return (
      <>
        <EmptyPage {...empty} />
        {fetchMore}
      </>
    )

  return (
    <>
      <div className={wrapperClass}>
        {data?.pages.map((list, i) =>
          list?.map((item, j) => (
            <Item item={item} index={j} {...itemProps} key={`${i}_${j}`} />
          )),
        )}
      </div>
      {fetchMore}
      <LoadingIndicator isLoading={isFetchingNextPage} size="small" />
    </>
  )
}

export default InfiniteList
