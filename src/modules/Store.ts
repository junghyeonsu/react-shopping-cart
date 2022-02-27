import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Products";
import cartsReducer from "./Carts";
import ordersReducer from "./Orders";
import modalReducer from "./Modal";

const store = configureStore({
  reducer: {
    products: productsReducer,
    carts: cartsReducer,
    orders: ordersReducer,
    modal: modalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
