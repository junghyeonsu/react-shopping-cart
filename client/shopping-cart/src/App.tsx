import { Routes, Route, Navigate } from 'react-router-dom';

import DefaultLayout from './layouts/DefaultLayout';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Products from './pages/Products';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        {/* https://github.com/remix-run/react-router/issues/8610 */}
        <Route index element={<Navigate to="/products" />} />
        <Route path="products" element={<Products />} />
        <Route path="carts" element={<Home />} />
        <Route path="orders" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
