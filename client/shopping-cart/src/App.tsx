import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import CartsPage from "./pages/CartsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* https://github.com/remix-run/react-router/issues/8610 */}
        <Route index element={<Navigate to="/products" />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="carts" element={<CartsPage />} />
        <Route path="orders" element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
