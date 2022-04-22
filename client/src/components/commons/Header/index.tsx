import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ROUTES from '$constants/routes'
import { fetchCarts, cartCountSelector } from '$stores/cart'

import { useAppDispatch } from '$stores'

export default function Header() {
  const dispatch = useAppDispatch()
  const cartCount = useSelector(cartCountSelector)

  useEffect(() => {
    dispatch(fetchCarts())
  }, [dispatch])

  return (
    <nav className="nav flex justify-around">
      <div className="flex-center">
        <Link to={ROUTES.HOME}>
          <h1 className="nav-title">CLEAN CODE SHOP</h1>
        </Link>
      </div>
      <div className="flex gap-15">
        <Link to={ROUTES.CART} className="flex">
          <button className="nav-button">장바구니({cartCount})</button>
        </Link>
        <Link to={ROUTES.ORDER_LIST} className="flex">
          <button className="nav-button">주문목록</button>
        </Link>
      </div>
    </nav>
  )
}
