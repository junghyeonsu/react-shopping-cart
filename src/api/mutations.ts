import { ProductRequest, OrderDetail, Order, Product } from '@/dto'
import { MutationFunction, UseMutationOptions, useMutation } from 'react-query'
import { fetcher } from './client'

const mutator =
  <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    mutationFn: MutationFunction<TData, TVariables>,
  ) =>
  (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
    useMutation<TData, TError, TVariables, TContext>(mutationFn, options)

export const useAddProduct = mutator<Product, unknown, ProductRequest>(body =>
  fetcher({
    method: 'POST',
    path: '/products',
    body,
  }),
)

export const useDeleteProduct = mutator<string, unknown, string>((id: string) =>
  fetcher({
    method: 'DELETE',
    path: `/products/${id}`,
  }),
)

export const useAddCart = mutator<OrderDetail, unknown, string>((id: string) =>
  fetcher({
    method: 'POST',
    path: '/cart',
    body: { id },
  }),
)

export const usePatchCart = mutator<
  OrderDetail,
  unknown,
  { id: string; quantity: number }
>(({ id, quantity }) =>
  fetcher({
    method: 'PATCH',
    path: `/cart/${id}`,
    body: { quantity },
  }),
)

export const useDeleteCarts = mutator<string, unknown, string[]>(
  (ids: string[]) =>
    fetcher({
      method: 'DELETE',
      path: `/cart`,
      body: { ids },
    }),
)

export const useAddOrder = mutator<Order, unknown, OrderDetail[]>(body =>
  fetcher({
    method: 'POST',
    path: '/orders',
    body,
  }),
)
