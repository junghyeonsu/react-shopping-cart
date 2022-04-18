import axios from 'axios'
import { Cart, Product } from '../../../types/dto'
import emptySplitApi, { ListResponse } from './common'

export type ProductPageProductData = Product & { isCartEntered: boolean }

export const productEndPoint = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    productList: builder.query<ListResponse<ProductPageProductData>, number | void>({
      async queryFn(page = 1, _queryApi, _extraOptions) {
        const productRequest = axios.get<ListResponse<Product>>(`http://localhost:3003/products?page=${page}`)
        const cartRequest = axios.get<Cart[]>('http://localhost:3003/carts')
        const [productResponse, cartRespnose] = await Promise.all([productRequest, cartRequest])

        const products = productResponse.data
        const carts = cartRespnose.data
        if (!products || !carts) {
          throw new Error()
        }

        const cartIdSet = new Set([...carts.map((cart) => cart.id)])

        const productListData: ProductPageProductData[] = products.data.map((product) => ({
          ...product,
          isCartEntered: cartIdSet.has(product.id) ? true : false,
        }))

        return {
          data: { ...products, data: productListData },
        }
      },
      providesTags: (result) => (result ? [...result.data.map(({ id }) => ({ type: 'Product' as const, id })), 'Product'] : ['Product']),
    }),
    productDetail: builder.query<Product | null, number>({
      async queryFn(orderId, _queryApi, _extraOptions) {
        const productResponse = await axios.get<Product | null>('http://localhost:3003/product?productId=' + orderId)

        const product = productResponse.data

        return {
          data: product,
        }
      },
      providesTags: (result) => [{ type: 'Product', id: result?.id }],
    }),
  }),
})

export const { useProductListQuery, useProductDetailQuery } = productEndPoint
