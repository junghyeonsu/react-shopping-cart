import ProductsModel from '../../model/products'
import { BaseReducerState, setRequestState, setRequestSuccessState, setReuqestFailureState } from '../reduxUtils'
import { UnionActionTypeOfProductsAction } from './productsAction'
import ProductsActionType from './productsActionType'

interface ProductsReducerState extends BaseReducerState<ProductsModel> {}

const initialState: ProductsReducerState = {
  value: new ProductsModel(),
  isFetching: false,
  hasError: false,
  errorStatus: -1,
}

const ProductsReducer = (state = initialState, action: UnionActionTypeOfProductsAction) => {
  switch (action.type) {
    case ProductsActionType.REQUEST_GET_PRODUCTS:
      return setRequestState(state)

    case ProductsActionType.REQUEST_GET_PRODUCTS_SUCCESS:
      return setRequestSuccessState(state, new ProductsModel(action.payload.products))

    case ProductsActionType.REQUEST_GET_PRODUCTS_FAILURE:
      return setReuqestFailureState(state, action.payload.errorStatus)

    default:
      return state
  }
}

export default ProductsReducer
