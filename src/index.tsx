import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import ShoppingCart from "./ShoppingCart";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
