import { Dispatch } from "react";
import { requestGetProducts } from "../../api";
import { ProductAction } from "./action";
import { ProductActionType } from "./actionType";

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionType.GET_PRODUCTS_REQUEST });
    try {
      const products = await requestGetProducts();
      dispatch({
        type: ProductActionType.GET_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (error: any) {
      dispatch({
        type: ProductActionType.GET_PRODUCTS_ERROR,
        payload: error.message,
      });
    }
  };
};
