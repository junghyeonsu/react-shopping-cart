import { Product } from "../../types/product";
import { ActionType } from "../action-types";

export interface GetProductsRequestAction {
  type: ActionType.GET_PRODUCTS_REQUEST;
}
export interface GetProductsSuccessAction {
  type: ActionType.GET_PRODUCTS_SUCCESS;
  payload: Product[] | any;
}
export interface GetProductsErrorAction {
  type: ActionType.GET_PRODUCTS_ERROR;
  payload: string | null;
}

export type Action =
  GetProductsRequestAction
  | GetProductsSuccessAction
  | GetProductsErrorAction;