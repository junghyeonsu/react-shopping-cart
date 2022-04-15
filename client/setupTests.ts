import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { MOCK_DATAS } from './src/core/testing/test.data'

import fetch from 'isomorphic-fetch'

global.fetch = fetch
globalThis.IS_REACT_ACT_ENVIRONMENT = true

const PAGE_PER_PRODUCT = 12

const handlers = [
  rest.get('http://localhost:3003/products', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page')) ?? 1

    const startProduct = Number(PAGE_PER_PRODUCT * (page - 1))
    const products = MOCK_DATAS.products.slice(startProduct, startProduct + PAGE_PER_PRODUCT)

    const productTotal = MOCK_DATAS.products.length

    const response = {
      page,
      per_page: PAGE_PER_PRODUCT,
      total: productTotal,
      total_pages: Math.ceil(productTotal / PAGE_PER_PRODUCT),
      data: products,
    }

    return res(ctx.json(response), ctx.status(200), ctx.delay(100))
  }),
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

export default server
