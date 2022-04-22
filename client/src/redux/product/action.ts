import { Product } from "../../types/dto";
import { ProductActionType } from "./actionType";

export interface GetProductsRequestAction {
  type: ProductActionType.GET_PRODUCTS_REQUEST;
}
export interface GetProductsSuccessAction {
  type: ProductActionType.GET_PRODUCTS_SUCCESS;
  payload: Product[];
}
export interface GetProductsErrorAction {
  type: ProductActionType.GET_PRODUCTS_ERROR;
  payload: string | null;
}

export type ProductAction =
  | GetProductsRequestAction
  | GetProductsSuccessAction
  | GetProductsErrorAction;
