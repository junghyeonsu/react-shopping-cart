import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Product } from '../../@types/products'
import { requestGetProducts } from '../../api/products'
import productsAction from './productsAction'
import ProductsActionType from './productsActionType'

function* getProductsSaga() {
  try {
    const products: Product[] = yield call(requestGetProducts)

    yield put(productsAction.requestGetProductsSuccess({ products }))
  } catch (error) {
    yield put(
      productsAction.requestGetProductsFailure({ errorStatus: axios.isAxiosError(error) ? error.response?.status ?? -1 : -1 })
    )
  }
}

function* watchProductsSaga() {
  yield takeLatest(ProductsActionType.REQUEST_GET_PRODUCTS, getProductsSaga)
}

export default watchProductsSaga
