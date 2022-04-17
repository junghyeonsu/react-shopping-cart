import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3003' }),
  tagTypes: ['Product', 'Cart', 'Order'],
  endpoints: () => ({}),
})

export default emptySplitApi
