import { Navigate, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import CartsPage from "./pages/CartsPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrdersPage from "./pages/OrdersPage";
import PaymentPage from "./pages/PaymentPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* https://github.com/remix-run/react-router/issues/8610 */}

        <Route
          index
          element={
            <ErrorBoundary fallback={<div>에러가 발생했어요...!</div>}>
              <Navigate to="/products" />
            </ErrorBoundary>
          }
        />

        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="carts" element={<CartsPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
