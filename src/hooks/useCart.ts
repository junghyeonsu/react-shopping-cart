import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import { getCarts, deleteCart, totalCheck } from "../modules/Carts";
import { postOrder } from "../modules/Orders";

function useCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalChecked, setTotalChecked] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const carts = useSelector((state: RootState) => state.carts.cartsList);

  const checkedCartList = carts
    .filter((cart) => cart.checked)
    .map((cart) => {
      return { ...cart.product, quantity: cart.quantity };
    });

  const handleTotalChecked = () => {
    setTotalChecked(!totalChecked);
  };

  const handleTotal = useCallback(() => {
    setTotalPrice(
      carts
        .map((cart) => (cart.checked ? cart.product.price * cart.quantity : 0))
        .reduce((previous, current) => previous + current, 0)
    );

    setTotalQuantity(
      carts
        .map((cart) => (cart.checked ? cart.quantity : 0))
        .reduce((previous, current) => previous + current, 0)
    );
  }, [carts]);

  const deleteChecked = () => {
    if (window.confirm("선택한 상품을 삭제하시겠습니까?")) {
      carts.forEach((cart) => {
        cart.checked && dispatch(deleteCart(cart.id));
      });
      dispatch(getCarts());
    }
  };

  const order = () => {
    if (window.confirm("주문하시겠습니까?")) {
      dispatch(postOrder(checkedCartList));
      carts.forEach((cart) => {
        cart.checked && dispatch(deleteCart(cart.id));
      });
      navigate("/order");
    }
  };

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  useEffect(() => {
    handleTotal();
  }, [handleTotal]);

  useEffect(() => {
    dispatch(totalCheck(totalChecked));
  }, [dispatch, totalChecked]);

  return {
    carts,
    totalPrice,
    totalChecked,
    totalQuantity,
    handleTotalChecked,
    deleteChecked,
    order,
  };
}

export default useCart;
