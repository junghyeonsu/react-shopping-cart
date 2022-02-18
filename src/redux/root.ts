import { combineReducers, StateFromReducersMapObject } from 'redux'
import { all } from 'redux-saga/effects'
import ProductsReducer from './products/productsReducer'
import watchProductsSaga from './products/productsSaga'

const reducerMap = {
  products: ProductsReducer,
}

type RootState = StateFromReducersMapObject<typeof reducerMap>

const rootReducer = combineReducers(reducerMap)

function* rootSaga() {
  yield all([watchProductsSaga()])
}

export { RootState, rootReducer, rootSaga }
