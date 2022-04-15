import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../../../types/dto'
import { ListResponse } from './common'

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    listProduct: builder.query<ListResponse<Product>, number | void>({
      query: (page = 1) => `products?page=${page}`,
      providesTags: (result, error, arg) => (result ? [...result.data.map(({ id }) => ({ type: 'Product' as const, id })), 'Product'] : ['Product']),
    }),
  }),
})

export const { useListProductQuery } = productApi
