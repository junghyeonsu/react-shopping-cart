import styled from "@emotion/styled";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import OrderProductItem from "../components/OrderProductItem";
import PaymentInformation from "../components/PaymentInformation";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location || !location.state) {
      console.warn("잘못된 경로입니다.");
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Container>
      <Title>주문 / 결제</Title>
      <Divider />
      <PaymentInfoContainer>
        <OrderProductContainer>
          <OrderProductHeader>주문 상품(4건)</OrderProductHeader>
          <OrderProductList>
            <OrderProductItem />
            <OrderProductItem />
            <OrderProductItem />
            <OrderProductItem />
            <OrderProductItem />
            <OrderProductItem />
            <OrderProductItem />
          </OrderProductList>
        </OrderProductContainer>

        <PaymentInformation
          title="결제금액"
          description="총 결제금액"
          amount={21000}
          actionButtonText={`${21000}원 결제하기`}
          onClickActionButton={() => null}
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
