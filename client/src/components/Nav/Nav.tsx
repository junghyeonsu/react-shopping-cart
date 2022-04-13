import { useHistory } from 'react-router-dom'
import './Nav.css'

export default function Nav({ children }: { children: React.ReactNode }) {
  const history = useHistory()
  return (
    <>
      <nav className="nav flex justify-around">
        <div className="flex-center">
          <h1 className="nav-title" onClick={() => history.push('/')}>
            CLEAN CODE SHOP
          </h1>
        </div>
        <div className="flex gap-15">
          <button className="nav-button" type="button" onClick={() => history.push('/cart')}>
            장바구니
          </button>
          <button
            className="nav-button"
            type="button"
            onClick={() => history.push('/product-order-list')}
          >
            주문목록
          </button>
        </div>
      </nav>
      {children}
    </>
  )
}
