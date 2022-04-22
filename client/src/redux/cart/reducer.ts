import { Cart } from "../../types/dto";
import { CartAction } from "./action";
import { CartActionType } from "./actionType";

interface InitialState {
  loading: boolean;
  products: Cart[] | null;
  message: string | null;
}

const initialState: InitialState = {
  loading: false,
  products: null,
  message: null,
};

const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case CartActionType.GET_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CartActionType.GET_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case CartActionType.GET_CART_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        products: null,
        message: "상품을 불러오는데 실패하였습니다.",
      };
    case CartActionType.POST_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CartActionType.POST_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CartActionType.POST_CART_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        message: "요청에 실패하였습니다.",
      };
    case CartActionType.DELETE_CART_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CartActionType.DELETE_CART_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        // products: action.payload,
      };
    case CartActionType.DELETE_CART_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        message: "삭제하는데 실패하였습니다.",
      };
    default:
      return state;
  }
};

export default cartReducer;
