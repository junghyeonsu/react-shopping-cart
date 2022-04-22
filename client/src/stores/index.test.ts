import { fetchProducts } from '$stores/product'

import store from '.'

describe('Product redux state tests', () => {
  it('Should be able to fetch products', async () => {
    expect(store.getState().product).toEqual({
      loading: false,
      list: [],
      error: false,
    })

    const result = await store.dispatch(fetchProducts())

    expect(store.getState().product).toEqual({
      loading: false,
      list: result.payload,
      error: false,
    })
  })
})
