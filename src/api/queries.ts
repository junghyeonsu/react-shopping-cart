import { SIZE } from '@/constants'
import { Product, OrderDetail, Order } from '@/dto'
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
        prevData.length === SIZE.products && pages.length + 1,
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
  useInfiniteQuery<OrderDetail[]>(
    QueryKeys.cart,
    ({ pageParam = 1, signal }) =>
      fetcher({
        method: 'GET',
        path: '/cart',
        params: {
          page: pageParam,
        },
        signal,
      }),
    {
      getNextPageParam: (prevData, pages) =>
        prevData.length === SIZE.cart && pages.length + 1,
    },
  )
export const useGetOrderList = () =>
  useInfiniteQuery<Order[]>(
    QueryKeys.orders,
    ({ pageParam = 1, signal }) =>
      fetcher({
        method: 'GET',
        path: '/orders',
        params: {
          page: pageParam,
        },
        signal,
      }),
    {
      getNextPageParam: (prevData, pages) =>
        prevData.length === SIZE.orders && pages.length + 1,
    },
  )
export const useGetOrder = (id: string) =>
  useQuery<Order>([QueryKeys.order, id], () =>
    fetcher({
      method: 'GET',
      path: `/orders/${id}`,
    }),
  )
