import { Cart } from "../../types/dto";
import { CartActionType } from "./actionType";

export interface PostCartProductsRequestAction {
  type: CartActionType.POST_CART_PRODUCTS_REQUEST;
}
export interface PostCartProductsSuccessAction {
  type: CartActionType.POST_CART_PRODUCTS_SUCCESS;
}
export interface PostCartProductsErrorAction {
  type: CartActionType.POST_CART_PRODUCTS_ERROR;
  payload: string | null;
}

export interface GetCartProductsRequestAction {
  type: CartActionType.GET_CART_PRODUCTS_REQUEST;
}
export interface GetCartProductsSuccessAction {
  type: CartActionType.GET_CART_PRODUCTS_SUCCESS;
  payload: Cart[];
}
export interface GetCartProductsErrorAction {
  type: CartActionType.GET_CART_PRODUCTS_ERROR;
  payload: string | null;
}

export interface DeleteCartProductsRequestAction {
  type: CartActionType.DELETE_CART_PRODUCTS_REQUEST;
}
export interface DeleteCartProductsSuccessAction {
  type: CartActionType.DELETE_CART_PRODUCTS_SUCCESS;
}
export interface DeleteCartProductsErrorAction {
  type: CartActionType.DELETE_CART_PRODUCTS_ERROR;
  payload: string | null;
}

export type CartAction =
  | PostCartProductsRequestAction
  | PostCartProductsSuccessAction
  | PostCartProductsErrorAction
  | GetCartProductsRequestAction
  | GetCartProductsSuccessAction
  | GetCartProductsErrorAction
  | DeleteCartProductsRequestAction
  | DeleteCartProductsSuccessAction
  | DeleteCartProductsErrorAction;
