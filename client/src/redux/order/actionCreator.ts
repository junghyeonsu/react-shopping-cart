import { Dispatch } from "react";
import {
  requestGetOrder,
  requestGetOrders,
  requestPostOrderDetails,
} from "../../api";
import { OrderDetail } from "../../types/dto";
import { OrderAction } from "./action";
import { OrderActionType } from "./actionType";

export const getOrders = () => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionType.GET_ORDERS_REQUEST });
    try {
      const orders = await requestGetOrders();
      dispatch({ type: OrderActionType.GET_ORDERS_SUCCESS, payload: orders });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.GET_ORDERS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getOrder = (id: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionType.GET_ORDER_REQUEST });
    try {
      const order = await requestGetOrder(id);
      dispatch({ type: OrderActionType.GET_ORDER_SUCCESS, payload: order });
    } catch (error: any) {
      dispatch({
        type: OrderActionType.GET_ORDER_ERROR,
        payload: error.message,
      });
    }
  };
};

export const postPaymentProducts = (
  paymentProducts: OrderDetail[],
  callback: () => void
) => {
  return (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionType.POST_PAYMENT_PRODUCTS_REQUEST });
    if (paymentProducts) {
      dispatch({
        type: OrderActionType.POST_PAYMENT_PRODUCTS_SUCCESS,
        payload: paymentProducts,
      });
      callback();
    } else {
      dispatch({
        type: OrderActionType.POST_PAYMENT_PRODUCTS_ERROR,
        payload: "해당 상품이 존재하지 않습니다.",
      });
    }
  };
};

export const postOrderDetails = (
  orderDetails: OrderDetail[],
  callback: () => void
) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    dispatch({ type: OrderActionType.POST_ORDER_DETAILS_REQUEST });
    try {
      await requestPostOrderDetails(orderDetails);
      dispatch({
        type: OrderActionType.POST_ORDER_DETAILS_SUCCESS,
      });
      callback();
    } catch (e: any) {
      dispatch({
        type: OrderActionType.POST_ORDER_DETAILS_ERROR,
        payload: e.message,
      });
    }
  };
};
