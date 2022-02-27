import React from "react";
import useOrder from "../hooks/useOrder";
import Order from "../components/Order";
import Modal from "../components/Modal";
import { OrderHook } from "../types/dto";

function OrderList() {
  const { orders, showModal } = useOrder();

  return (
    <React.Fragment>
      <section className="order-section">
        <header className="flex-col-center mt-20">
          <h2 className="order-section__title">주문 목록</h2>
          <hr className="divide-line mt-20" />
        </header>
        {orders.map((order: OrderHook, index: number) => (
          <Order key={order.id} order={order} index={index} />
        ))}
      </section>
      {showModal && <Modal />}
    </React.Fragment>
  );
}

export default OrderList;
