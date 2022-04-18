import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import OrderList from './pages/OrderList'
import ProductList from './pages/ProductList'
import CartSubmit from './pages/CartSubmit'
import OrderDetail from './pages/OrderDetail'
import ProductDetail from './pages/ProductDetail'

export type NavigateRoute = '/' | 'productList' | 'cart' | 'orderList' | 'cartSubmit'

const CleanCodeRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ProductList />} />
      <Route path="productList" element={<ProductList />} />
      <Route path="productDetail" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="orderDetail" element={<OrderDetail />} />
      <Route path="orderList" element={<OrderList />} />
      <Route path="cartSubmit" element={<CartSubmit />} />
    </Routes>
  )
}

export default CleanCodeRouter
