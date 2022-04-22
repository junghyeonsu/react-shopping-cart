import { Product } from "../../types/dto";
import { ProductAction } from "./action";
import { ProductActionType } from "./actionType";

interface InitialState {
  loading: boolean;
  products: Product[] | null;
  message: string | null;
}

const initialState: InitialState = {
  loading: false,
  products: null,
  message: null,
};

const productReducer = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    case ProductActionType.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ProductActionType.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products
          ? [...state.products, ...action.payload]
          : action.payload,
      };
    case ProductActionType.GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        products: null,
        message: "상품을 불러오는데 실패하였습니다.",
      };
    default:
      return state;
  }
};

export default productReducer;
