import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Products";
import cartsReducer from "./Carts";

const store = configureStore({
  reducer: { products: productsReducer, carts: cartsReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
