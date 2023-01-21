import styled from "@emotion/styled";

export default function OrdersPage() {
  return (
    <Container>
      <Title>주문목록</Title>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;
`;
