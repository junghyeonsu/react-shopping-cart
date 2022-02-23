import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import "./examples/css/index.css";
import Cart from "./pages/Cart";
import OrderList from "./pages/OrderList";
import { PATH } from "./constants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.MAIN} element={<ProductList />} />
        <Route path={PATH.CART} element={<Cart />} />
        <Route path={PATH.ORDERLIST} element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
