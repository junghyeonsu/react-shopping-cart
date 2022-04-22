import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTitle from "../components/PageTitle";
import TotalPriceWithButton from "../components/TotalPriceWithButton";
import { PATH } from "../constants";
import { useActions } from "../hooks/useActions";
import { RootState } from "../redux/reducers";

const Payment = () => {
  const { paymentProducts } = useSelector((state: RootState) => state.orders);
  const { postOrderDetails } = useActions();
  const navigation = useNavigate();

  const getTotalPrice = () => {
    return paymentProducts!.reduce(
      (acc, cur) => (acc += cur.price * cur.quantity),
      0
    );
  };

  const onClickOrderButton = () => {
    postOrderDetails(paymentProducts!, () => navigation(PATH.ORDERLIST));
  };

  return (
    <Layout>
      <section className="order-section">
        <PageTitle title="주문/결제" />
        {paymentProducts && (
          <div className="flex">
            <section className="order-left-section">
              <h3 className="order-title">
                주문 상품({paymentProducts.length}건)
              </h3>
              <hr className="divide-line-gray mt-10" />
              {paymentProducts.map((product, index) => (
                <Fragment key={`${product.id}-${index}`}>
                  <div className="order-container">
                    <div className="flex gap-15 mt-10">
                      <img
                        className="w-144 h-144"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div className="flex-col gap-15">
                        <span className="order-name">{product.name}</span>
                        <span>수량: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <hr className="divide-line-thin mt-10" />
                </Fragment>
              ))}
            </section>
            <TotalPriceWithButton
              title="결제금액"
              content="총 예상금액"
              price={getTotalPrice()}
              buttonContent={`${getTotalPrice()}원 결제하기`}
              onClickButton={onClickOrderButton}
            />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Payment;
