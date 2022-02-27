import useOrder from "../hooks/useOrder";
import OrderDetail from "../components/OrderDetail";
import { OrderDetailHook } from "../types/dto";

function Ordering() {
  const { orderDetails, totalOrderPrice, charge } = useOrder();
  return (
    <section className="order-section">
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문/결제</h2>
        <hr className="divide-line mt-20" />
      </header>
      <div className="flex">
        <section className="order-left-section">
          <h3 className="order-title">{`주문 상품(${orderDetails.length}건)`}</h3>
          <hr className="divide-line-gray mt-10" />
          {orderDetails.map((orderDetail: OrderDetailHook) => (
            <OrderDetail key={orderDetail.id} orderDetail={orderDetail} />
          ))}
        </section>
        <section className="order-right-section">
          <div className="order-right-section__top">
            <h3 className="order-title">결제금액</h3>
          </div>
          <hr className="divide-line-thin" />
          <div className="order-right-section__bottom">
            <div className="flex justify-between p-20 mt-20">
              <span className="highlight-text">총 결제금액</span>
              <span className="highlight-text">{`${totalOrderPrice.toLocaleString()}원`}</span>
            </div>
            <div className="flex-center mt-30 mx-10">
              <button className="primary-button flex-center" onClick={charge}>
                {`${totalOrderPrice.toLocaleString()}원 결제하기`}
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Ordering;
