import { Order, OrderDetail } from "../../types/dto";
import { OrderActionType } from "./actionType";

export interface GetOrdersRequestAction {
  type: OrderActionType.GET_ORDERS_REQUEST;
}
export interface GetOrdersSuccessAction {
  type: OrderActionType.GET_ORDERS_SUCCESS;
  payload: Order[];
}
export interface GetOrdersErrorAction {
  type: OrderActionType.GET_ORDERS_ERROR;
  payload: string | null;
}

export interface GetOrderRequestAction {
  type: OrderActionType.GET_ORDER_REQUEST;
}
export interface GetOrderSuccessAction {
  type: OrderActionType.GET_ORDER_SUCCESS;
  payload: Order;
}
export interface GetOrderErrorAction {
  type: OrderActionType.GET_ORDER_ERROR;
  payload: string | null;
}

export interface PostOrderDetailsRequestAction {
  type: OrderActionType.POST_ORDER_DETAILS_REQUEST;
}
export interface PostOrderDetailsSuccessAction {
  type: OrderActionType.POST_ORDER_DETAILS_SUCCESS;
}
export interface PostOrderDetailsErrorAction {
  type: OrderActionType.POST_ORDER_DETAILS_ERROR;
  payload: string | null;
}

export interface PostPaymentProductsRequestAction {
  type: OrderActionType.POST_PAYMENT_PRODUCTS_REQUEST;
}
export interface PostPaymentProductsSuccessAction {
  type: OrderActionType.POST_PAYMENT_PRODUCTS_SUCCESS;
  payload: OrderDetail[];
}
export interface PostPaymentProductsErrorAction {
  type: OrderActionType.POST_PAYMENT_PRODUCTS_ERROR;
  payload: string | null;
}

export type OrderAction =
  | GetOrdersRequestAction
  | GetOrdersSuccessAction
  | GetOrdersErrorAction
  | GetOrderRequestAction
  | GetOrderSuccessAction
  | GetOrderErrorAction
  | PostPaymentProductsRequestAction
  | PostPaymentProductsSuccessAction
  | PostPaymentProductsErrorAction
  | PostOrderDetailsRequestAction
  | PostOrderDetailsSuccessAction
  | PostOrderDetailsErrorAction;
