import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="nav">
      <div className="flex justify-between nav-content">
        <div className="flex-center">
          <h1 className="nav-title pointer" onClick={() => navigateToPage('/')}>
            CLEAN CODE SHOP
          </h1>
        </div>
        <div className="flex gap-15">
          <button
            className="nav-button pointer"
            onClick={() => navigateToPage('/cart')}
          >
            장바구니
          </button>
          <button
            className="nav-button pointer"
            onClick={() => navigateToPage('/order-list')}
          >
            주문목록
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
