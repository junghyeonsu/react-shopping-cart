import { test, expect } from 'vitest'
import { FC } from 'react'
import nock from 'nock'
import fetch from 'cross-fetch'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import * as queries from './queries'
import { SERVER_URL } from './client'
import apiMockData from './apiMockData'
import { SIZE } from '@/constants'

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

const infiniteFetchTestSet =
  (
    key: 'products' | 'cart' | 'orders',
    query: Function,
    uri: string,
    size: number,
  ) =>
  async () => {
    const getListMockResponse = (page: number) =>
      apiMockData[key].slice(0, size)
    const expectation = nock(SERVER_URL)
      .persist()
      .get(uri)
      .query(true)
      .reply(200, uri => {
        const url = new URL(`${SERVER_URL}${uri}`)
        const { page } = Object.fromEntries(url.searchParams)
        return getListMockResponse(parseInt(page))
      })

    const { result, waitFor } = renderHook(() => query(), {
      wrapper,
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data!.pages).toStrictEqual([getListMockResponse(1)])

    result.current.fetchNextPage()
    await waitFor(() => result.current.isFetching)
    await waitFor(() => !result.current.isFetching)
    expect(result.current.data!.pages).toStrictEqual([
      getListMockResponse(1),
      getListMockResponse(2),
    ])
    expectation.done()
  }

test(
  'useGetProductList',
  infiniteFetchTestSet(
    'products',
    queries.useGetProductList,
    '/products',
    SIZE.products,
  ),
)

test(
  'useGetCarts',
  infiniteFetchTestSet('cart', queries.useGetCarts, '/cart', SIZE.cart),
)

test(
  'useGetOrderList',
  infiniteFetchTestSet(
    'orders',
    queries.useGetOrderList,
    '/orders',
    SIZE.orders,
  ),
)

test('useGetProduct', async () => {
  const expectation = nock(SERVER_URL)
    .get(/\/products\/[A-z0-9-_]*/g)
    .reply(200, apiMockData.products[0])

  const { result, waitFor } = renderHook(() => queries.useGetProduct('0'), {
    wrapper,
  })
  await waitFor(() => result.current.isSuccess)
  expect(result.current.data).toStrictEqual(apiMockData.products[0])
  expectation.done()
})

test('useGetOrder', async () => {
  const expectation = nock(SERVER_URL)
    .get(/\/orders\/[A-z0-9-_]*/g)
    .reply(200, apiMockData.orders[0])

  const { result, waitFor } = renderHook(() => queries.useGetOrder('0'), {
    wrapper,
  })
  await waitFor(() => result.current.isSuccess)
  expect(result.current.data).toStrictEqual(apiMockData.orders[0])
  expectation.done()
})
