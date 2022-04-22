import { rest } from 'msw'

import mockProducts from './mockProducts'

const handlers = [
  rest.get('http://localhost:3003/products', (req, res, ctx) => {
    // for test infinite scroll
    return res(
      ctx.json([
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
        ...mockProducts,
      ]),
    )
  }),
  rest.get('http://localhost:3003/products/:id', (req, res, ctx) => {
    const { id } = req.params

    const cart = mockProducts.find((cartItem) => cartItem.id === id)

    return res(ctx.json(cart))
  }),
]

export default handlers
