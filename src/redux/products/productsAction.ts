import { Product } from '../../@types/products'
import { ActionTypeMap, BaseErrorPayload, makeActionCreator } from '../reduxUtils'
import ProductsActionType from './productsActionType'

interface requestGetProductsSuccessActionPayload {
  products: Product[]
}

const productsAction = {
  requestGetProducts: makeActionCreator(ProductsActionType.REQUEST_GET_PRODUCTS)(),
  requestGetProductsSuccess: makeActionCreator(
    ProductsActionType.REQUEST_GET_PRODUCTS_SUCCESS
  )<requestGetProductsSuccessActionPayload>(),
  requestGetProductsFailure: makeActionCreator(ProductsActionType.REQUEST_GET_PRODUCTS_FAILURE)<BaseErrorPayload>(),
}

type ActionTypeOfProductsAction = ActionTypeMap<typeof productsAction>
type UnionActionTypeOfProductsAction = ActionTypeOfProductsAction[keyof ActionTypeOfProductsAction]

export default productsAction
export { UnionActionTypeOfProductsAction }
