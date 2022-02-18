import { call } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'

import watchProducts from './productsSaga'
import productsAction from './productsAction'
import { requestGetProducts } from '../../api/products'
import { Product } from '../../@types/products'
import { throwError } from 'redux-saga-test-plan/providers'

const products: Product[] = [
  {
    id: 1,
    name: '[든든] 유부 슬라이스 500g',
    imageUrl: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
    price: 4900,
  },
  {
    id: 2,
    name: '[든든] 유부 슬라이스 500g',
    imageUrl: 'https://cdn-mart.baemin.com/goods/custom/20200525/11153-main-01.png',
    price: 4900,
  },
]

describe('cart products test', () => {
  it('should getProducts success', () => {
    return expectSaga(watchProducts)
      .dispatch(productsAction.requestGetProducts())
      .provide([[call(requestGetProducts), products]])
      .put(productsAction.requestGetProductsSuccess({ products }))
      .run()
  })

  it('should getProducts fail', () => {
    return expectSaga(watchProducts)
      .dispatch(productsAction.requestGetProducts())
      .provide([[call(requestGetProducts), throwError(new Error('Something went wrong'))]])
      .put(productsAction.requestGetProductsFailure({ errorStatus: -1 }))
      .run()
  })
})
