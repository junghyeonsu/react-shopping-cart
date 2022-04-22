import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '$components/commons/Header'
import ROUTES from '$constants/routes'
import CartPage from '$pages/CartPage'
import NotFoundPage from '$pages/NotFoundPage'
import OrderCheckoutPage from '$pages/OrderCheckoutPage'
import OrderDetailPage from '$pages/OrderDetailPage'
import OrderListPage from '$pages/OrderListPage'
import ProductDetailPage from '$pages/ProductDetailPage'
import ProductListPage from '$pages/ProductListPage'

import store from '$stores'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.ORDER_LIST} element={<OrderListPage />} />
          <Route path={ROUTES.ORDER_DETAIL} element={<OrderDetailPage />} />
          <Route path={ROUTES.ORDER_CHECKOUT} element={<OrderCheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
