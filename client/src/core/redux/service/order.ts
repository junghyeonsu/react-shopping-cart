import axios from 'axios'
import { Order, Product } from '../../../types/dto'
import emptySplitApi from './common'

export type ProductPageProductData = Product & { isCartEntered: boolean }

export const orderEndPoint = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    orderList: builder.query<Order[], number | void>({
      async queryFn(_, _queryApi, _extraOptions) {
        const orderResponse = await axios.get<Order[]>('http://localhost:3003/orders')

        const orders = orderResponse.data ?? []

        return {
          data: orders,
        }
      },
      providesTags: ['Order'],
    }),
  }),
})

export const { useOrderListQuery } = orderEndPoint
