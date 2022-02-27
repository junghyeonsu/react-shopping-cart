import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/Store";
import { getOrders } from "../modules/Orders";

function useOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalOrderPrice, setTotalOrderPrice] = useState(0);

  const orders = useSelector((state: RootState) => state.orders.ordersList);
  const showModal = useSelector((state: RootState) => state.modal.showModal);

  const orderDetails = orders
    .map((order) => order.orderDetails)
    .reduce((previous, current) => [...previous, ...current], []);

  const handleOrderTotal = useCallback(() => {
    setTotalOrderPrice(
      orderDetails
        .map((orderDetail) => orderDetail.price * orderDetail.quantity)
        .reduce((previous, current) => previous + current, 0)
    );
  }, [orderDetails]);

  const charge = () => {
    if (window.confirm("결제하시겠습니까?")) {
      navigate("/orderlist");
    }
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    handleOrderTotal();
  }, [handleOrderTotal]);

  return {
    orders,
    orderDetails,
    showModal,
    totalOrderPrice,
    charge,
  };
}
export default useOrder;
