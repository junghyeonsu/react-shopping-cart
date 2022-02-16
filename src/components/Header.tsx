import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="nav flex justify-around">
      <div className="flex-center">
        <Link to="/" style={{ cursor: "pointer" }}>
          <h1 className="nav-title">CLEAN CODE SHOP</h1>
        </Link>
      </div>
      <div className="flex-center gap-15">
        <Link to="/cart" style={{ cursor: "pointer" }}>
          <button className="nav-button">장바구니</button>
        </Link>
        <Link to="/order" style={{ cursor: "pointer" }}>
          <button className="nav-button">주문목록</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
