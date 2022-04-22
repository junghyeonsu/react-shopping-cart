import { combineReducers } from "redux";
import cartReducer from "./cart/reducer";
import orderReducer from "./order/reducer";
import productReducer from "./product/reducer";

const reducers = combineReducers({
  products: productReducer,
  carts: cartReducer,
  orders: orderReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
