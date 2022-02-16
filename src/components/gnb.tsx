import { NavLink } from 'react-router-dom'

const Gnb = () => (
  <header>
    <nav className="nav flex justify-around">
      <NavLink className="flex-center" to="/">
        <h1 className="nav-title" title="CLEAN CODE SHOP" />
      </NavLink>
      <div className="flex gap-15">
        <NavLink className="nav-button" to="/cart">
          장바구니
        </NavLink>
        <NavLink className="nav-button" to="/ordered">
          주문목록
        </NavLink>
        <NavLink className="nav-button" to="/admin">
          ADMIN
        </NavLink>
      </div>
    </nav>
  </header>
)

export default Gnb
