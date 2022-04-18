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
    orderDetail: builder.query<Order | null, number>({
      async queryFn(orderId, _queryApi, _extraOptions) {
        const orderResponse = await axios.get<Order | null>('http://localhost:3003/order?orderId=' + orderId)

        const order = orderResponse.data

        return {
          data: order,
        }
      },
      providesTags: (result) => [{ type: 'Order', id: result?.id }],
    }),
  }),
})

export const { useOrderListQuery, useOrderDetailQuery } = orderEndPoint
