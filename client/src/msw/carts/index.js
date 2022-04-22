import { rest } from 'msw'

import mockCarts from './mockCarts'

const handlers = [
  rest.get('http://localhost:3003/carts', (_, res, ctx) => {
    return res(ctx.json(mockCarts))
  }),
  rest.get('http://localhost:3003/carts/:id', (req, res, ctx) => {
    const { id } = req.params

    const cart = mockCarts.find((cartItem) => cartItem.id === id)

    return res(ctx.json(cart))
  }),
]

export default handlers
