import { Product, GetCartResponse, GetOrderResponse } from '@/dto'
import { useInfiniteQuery, useQuery } from 'react-query'
import { fetcher, QueryKeys } from './client'

export const useGetProductList = () =>
  useInfiniteQuery<Product[]>(
    QueryKeys.products,
    ({ pageParam = 1, signal }) =>
      fetcher({
        method: 'GET',
        path: '/products',
        params: {
          page: pageParam,
        },
        signal,
      }),
    {
      getNextPageParam: (prevData, pages) =>
        prevData.length === 12 && pages.length + 1,
    },
  )

export const useGetProduct = (id: string) =>
  useQuery<Product>([QueryKeys.product, id], () =>
    fetcher({
      method: 'GET',
      path: `/products/${id}`,
    }),
  )
export const useGetCarts = () =>
  useQuery<GetCartResponse[]>(QueryKeys.cart, () =>
    fetcher({
      method: 'GET',
      path: '/cart',
    }),
  )
export const useGetOrderList = () =>
  useQuery<GetOrderResponse[]>(QueryKeys.orders, () =>
    fetcher({
      method: 'GET',
      path: '/orders',
    }),
  )
export const useGetOrder = (id: string) =>
  useQuery<GetOrderResponse>([QueryKeys.order, id], () =>
    fetcher({
      method: 'GET',
      path: `/orders/${id}`,
    }),
  )
