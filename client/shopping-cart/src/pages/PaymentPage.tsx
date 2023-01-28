import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { usePostOrders } from "../api/order";
import OrderProductItem from "../components/OrderProductItem";
import PaymentInformation from "../components/PaymentInformation";
import type { RootState } from "../store";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.cart.products);

  const { mutate: postOrders } = usePostOrders({
    onSuccess: () => {
      console.log("주문이 완료되었습니다.");
      navigate("/orders");
    },
  });

  useEffect(() => {
    if (!location || !location.state) {
      console.warn("잘못된 경로입니다.");
      navigate("/");
    }
  }, [location, navigate]);

  const checkedProducts = products.filter((product) => product.checked);
  const productsCount = checkedProducts.length;
  const allProductsPrice = checkedProducts.reduce(
    (acc, product) => acc + product.price * product.quantity!,
    0,
  );

  const handlePayment = () => {
    const isConfirmed = window.confirm("결제하시겠습니까?");
    if (!isConfirmed) return;

    postOrders({ products: checkedProducts });
  };

  return (
    <Container>
      <Title>주문 / 결제</Title>
      <Divider />
      <PaymentInfoContainer>
        <OrderProductContainer>
          <OrderProductHeader>주문 상품({productsCount}건)</OrderProductHeader>
          <OrderProductList>
            {checkedProducts.map((product) => (
              <OrderProductItem key={product.id} product={product} />
            ))}
          </OrderProductList>
        </OrderProductContainer>

        <PaymentInformation
          title="결제금액"
          description="총 결제금액"
          amount={allProductsPrice}
          actionButtonText={`${allProductsPrice.toLocaleString()}원 결제하기`}
          actionButtonDisabled={false}
          onClickActionButton={handlePayment}
        />
      </PaymentInfoContainer>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1200px;

  margin: auto;
`;

const Divider = styled.div`
  border-bottom: 4px solid rgba(170, 170, 170, 1);

  margin: 20px 8px;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;

  text-align: center;
`;

const PaymentInfoContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderProductContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;

  width: 100%;
  max-width: 700px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const OrderProductHeader = styled.h2`
  margin-top: 40px;
  font-size: 24px;
  font-weight: 700;
`;

const OrderProductList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding-bottom: 140px;
  }
`;
