import React, { useEffect, useMemo, useState } from 'react';
import useDevice from '@/hooks/useDevice';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderDetailsI } from '@/models/order';
import { formattedPrice } from '@/utils';
import AlertModal from '@/components/Modal/AlertModal';

const OrderPage = () => {
  const device = useDevice();
  const isMobile = device === 'mobile';

  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<OrderDetailsI[]>([]);
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    setItems(location.state as OrderDetailsI[]);
  }, []);

  const totalOrderPrice = useMemo(
    () => items.reduce((acc, curr) => acc + curr.price, 0),
    [items],
  );

  return (
    <section className="order-section">
      <header className="flex-col-center mt-20">
        <h2 className="order-section__title">주문/결제</h2>
        <hr className="divide-line mt-20" />
      </header>

      {items ? (
        <div className="flex justify-between order-section-wrap">
          <section className="order-left-section">
            <h3 className="order-title">주문 상품({items.length}건)</h3>
            <hr className="divide-line-gray mt-10" />
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <div className="order-container">
                  <div className="flex gap-15 mt-10">
                    <img
                      className={isMobile ? 'w-100 h-100' : 'w-144 h-144'}
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <div className="flex-col gap-15">
                      <span className="order-name">{item.name}</span>
                      <span>수량: {item.quantity}</span>
                    </div>
                  </div>
                </div>
                <hr className="divide-line-thin mt-10" />
              </React.Fragment>
            ))}
          </section>
          <section className="order-right-section__thin">
            <div className="order-right-section__top">
              <h3 className="order-title">결제금액</h3>
            </div>
            <hr className="divide-line-thin" />
            <div className="order-right-section__bottom">
              <div className="flex justify-between p-20 mt-20 order-right-section__amount">
                <span className="highlight-text">총 결제금액</span>
                <span className="highlight-text">
                  {formattedPrice(totalOrderPrice)}원
                </span>
              </div>
              <div className="flex-center mt-30 mx-10 order-right-section__buy-button">
                <button
                  className="primary-button flex-center pointer"
                  onClick={() => setConfirmModal(true)}
                >
                  {formattedPrice(totalOrderPrice)}원 결제하기
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex justify-center mt-40">
          일시적으로 주문하신 물건을 불러올 수 없습니다. 주문목록에서
          확인해주세요.
        </div>
      )}
      <AlertModal
        isShow={confirmModal}
        description={'해당 상품을 결제하시겠습니까?'}
        onClose={() => setConfirmModal(false)}
        onConfirm={() => {
          navigate('/order-list');
        }}
      />
    </section>
  );
};

export default OrderPage;
