import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../../constants";

const GNB = () => {
  return (
    <nav className="nav flex justify-around align-items-center">
      <div className="flex-center">
        <Link to={PATH.MAIN}>
          <h1 className="nav-title cursor-pointer">CLEAN CODE SHOP</h1>
        </Link>
      </div>
      <div className="flex gap-15">
        <Link to={PATH.CART}>
          <button className="nav-button cursor-pointer">장바구니</button>
        </Link>
        <Link to={PATH.ORDERLIST}>
          <button className="nav-button cursor-pointer">주문목록</button>
        </Link>
      </div>
    </nav>
  );
};

export default GNB;
