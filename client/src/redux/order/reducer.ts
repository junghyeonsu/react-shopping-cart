import { Order, OrderDetail } from "../../types/dto";
import { OrderActionType } from "./actionType";
import { OrderAction } from "./action";

interface InitialState {
  loading: boolean;
  orders: Order[] | null;
  paymentProducts: OrderDetail[] | null;
  message: string | null;
}

export const initialState: InitialState = {
  loading: false,
  orders: null,
  paymentProducts: null,
  message: null,
};

const orderReducer = (state = initialState, action: OrderAction) => {
  switch (action.type) {
    case OrderActionType.GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case OrderActionType.GET_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        orders: null,
        message: "주문목록을 불러오는데 실패하였습니다.",
      };
    case OrderActionType.GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case OrderActionType.GET_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        order: null,
        message: "주문을 불러오는데 실패하였습니다.",
      };
    case OrderActionType.POST_PAYMENT_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.POST_PAYMENT_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentProducts: action.payload,
      };
    case OrderActionType.POST_PAYMENT_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        paymentProducts: null,
        message: action.payload,
      };
    case OrderActionType.POST_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OrderActionType.POST_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case OrderActionType.POST_ORDER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        paymentProducts: null,
        message: "요청에 실패하였습니다.",
      };
    default:
      return state;
  }
};

export default orderReducer;
