import { Dispatch } from "react";
import {
  requestDeleteCartProduct,
  requestGetCartProducts,
  requestPostCartProduct,
} from "../../api";
import { Product } from "../../types/dto";
import { CartAction } from "./action";
import { CartActionType } from "./actionType";

export const postCartProduct = (product: Product, callback: () => void) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.POST_CART_PRODUCTS_REQUEST });
    try {
      await requestPostCartProduct(product);
      dispatch({ type: CartActionType.POST_CART_PRODUCTS_SUCCESS });
      callback();
    } catch (error: any) {
      dispatch({
        type: CartActionType.POST_CART_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getCartProducts = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.GET_CART_PRODUCTS_REQUEST });
    try {
      const cartProducts = await requestGetCartProducts();
      dispatch({
        type: CartActionType.GET_CART_PRODUCTS_SUCCESS,
        payload: cartProducts,
      });
    } catch (error: any) {
      dispatch({
        type: CartActionType.GET_CART_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteCartProduct = (
  id: number,
  callback: () => void = () => {}
) => {
  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionType.DELETE_CART_PRODUCTS_REQUEST });
    try {
      await requestDeleteCartProduct(id);
      dispatch({
        type: CartActionType.DELETE_CART_PRODUCTS_SUCCESS,
      });
      callback();
    } catch (error: any) {
      dispatch({
        type: CartActionType.DELETE_CART_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};
