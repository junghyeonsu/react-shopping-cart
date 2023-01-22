import styled from "@emotion/styled";

import OrderResultItem from "../components/OrderResultItem";

export default function OrdersPage() {
  return (
    <Container>
      <Title>주문 / 결제</Title>
      <Divider />
      <OrderContainer>
        <OrderProductContainer>
          <OrderProductHeader>
            <OrderProductHeaderTitle>주문 번호 1번</OrderProductHeaderTitle>
          </OrderProductHeader>
          <OrderProductList>
            <OrderResultItem />
            <OrderResultItem />
            <OrderResultItem />
            <OrderResultItem />
          </OrderProductList>
        </OrderProductContainer>

        <OrderProductContainer>
          <OrderProductHeader>
            <OrderProductHeaderTitle>주문 번호 2번</OrderProductHeaderTitle>
          </OrderProductHeader>
          <OrderProductList>
            <OrderResultItem />
            <OrderResultItem />
            <OrderResultItem />
            <OrderResultItem />
          </OrderProductList>
        </OrderProductContainer>
      </OrderContainer>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1200px;

  margin: 0 auto 100px auto;
`;

const Divider = styled.div`
  border-bottom: 4px solid rgba(170, 170, 170, 1);

  width: 95%;

  margin: 20px auto;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;

  text-align: center;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;

  width: 100%;

  gap: 60px;
`;

const OrderProductContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;

  width: 95%;

  border: 2px solid rgba(170, 170, 170, 1);

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const OrderProductHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: rgba(246, 246, 246, 1);
`;

const OrderProductHeaderTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const OrderProductList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 20px;
`;
