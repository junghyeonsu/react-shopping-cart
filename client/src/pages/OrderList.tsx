import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import { PATH } from "../constants";
import { useActions } from "../hooks/useActions";
import { RootState } from "../redux/reducers";
import { OrderDetail } from "../types/dto";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "flex-direction": "column",
  },
};

const OrderList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getOrders, postCartProduct } = useActions();
  const { orders } = useSelector((state: RootState) => state.orders);
  const navigation = useNavigate();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const onClickAddCart = ({ id, imageUrl, name, price }: OrderDetail) => {
    postCartProduct(
      {
        id,
        imageUrl,
        name,
        price,
      },
      () => setIsModalOpen(true)
    );
  };

  const onClickCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickModalButton = () => {
    navigation(PATH.CART);
  };

  return (
    <Layout>
      <section className="order-section">
        <PageTitle title="주문 목록" />

        {orders &&
          orders.map((order) => (
            <div className="order-list" key={order.id}>
              <div className="order-list__header">
                <span>주문번호: {order.id}</span>
                <button className="cursor-pointer">상세보기 {">"}</button>
              </div>
              {order.orderDetails.map((orderDetail, index) => (
                <div className="order-list-item" key={`${order.id}-${index}`}>
                  <div className="flex gap-15 mt-10">
                    <img
                      className="w-144 h-144"
                      src={orderDetail.imageUrl}
                      alt="PET보틀-정사각(420ml)"
                    />
                    <div className="flex-col gap-15">
                      <span className="order-name">{orderDetail.name}</span>
                      <span className="order-info">
                        {orderDetail.price * orderDetail.quantity}원 / 수량:{" "}
                        {orderDetail.quantity}개
                      </span>
                    </div>
                  </div>
                  <button
                    className="primary-button-small flex-center self-start cursor-pointer"
                    onClick={() => onClickAddCart(orderDetail)}
                  >
                    장바구니
                  </button>
                </div>
              ))}
            </div>
          ))}
      </section>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onClickCloseModal}
        style={customStyles}
      >
        <button
          className="cursor-pointer"
          onClick={onClickCloseModal}
          style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            padding: "10px",
          }}
        >
          X
        </button>
        <div>
          <p>장바구니에 담았습니다.</p>
          <p>장바구니로 이동하시겠습니까?</p>
        </div>
        <div>
          <button
            className="primary-button-small flex-center self-start cursor-pointer"
            style={{ marginTop: "20px" }}
            onClick={onClickModalButton}
          >
            장바구니로 이동
          </button>
        </div>
      </Modal>
    </Layout>
  );
};

export default OrderList;
