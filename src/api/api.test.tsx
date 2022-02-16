import { FC } from 'react'
import nock from 'nock'
import fetch from 'cross-fetch'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import * as queries from './queries'
import { SERVER_URL } from './client'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
})

const wrapper = ({ children }: { children: FC<any> }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

globalThis.fetch = fetch

test('useGetProductList - 최초fetch시, 두번째fetch시 데이터 구조 테스트', async () => {
  const getProductListMockResponse = (page: number) => [
    {
      id: 'test1',
      price: 9999,
      name: '랜덤상품',
      imageUrl: 'https://abc.com',
    },
    {
      id: 'test2',
      price: 5000,
      name: '떡뽀퀸',
      imageUrl: 'https://abcd.com',
    },
  ]
  const expectation = nock(SERVER_URL)
    .persist()
    .get('/products')
    .query(true)
    .reply(200, uri => {
      const url = new URL(`${SERVER_URL}${uri}`)
      const { page } = Object.fromEntries(url.searchParams)
      return getProductListMockResponse(parseInt(page))
    })

  const { result, waitFor } = renderHook(() => queries.useGetProductList(), {
    wrapper,
  })
  await waitFor(() => result.current.isSuccess)
  expect(result.current.data!.pages).toStrictEqual([
    getProductListMockResponse(1),
  ])

  result.current.fetchNextPage()
  await waitFor(() => result.current.isFetching)
  await waitFor(() => !result.current.isFetching)
  expect(result.current.data!.pages).toStrictEqual([
    getProductListMockResponse(1),
    getProductListMockResponse(2),
  ])

  expectation.done()
})
