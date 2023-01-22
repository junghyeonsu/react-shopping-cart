import styled from "@emotion/styled";

import CartProductItem from "../components/CartProductItem";

export default function CartsPage() {
  return (
    <Container>
      <Title>장바구니</Title>
      <Divider />

      <ProductCartContainer>
        <ProductCartDetailSection>
          <ProductCartHeader>
            <ProductCartHeaderLabel>
              <Checkbox type="checkbox" />
              선택해제
            </ProductCartHeaderLabel>
            <ProductCartHeaderDeleteButton>상품삭제</ProductCartHeaderDeleteButton>
          </ProductCartHeader>
          <ProductListTitle>상품 ({null}개)</ProductListTitle>

          <ProductList>
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
            <CartProductItem />
          </ProductList>
        </ProductCartDetailSection>

        <PaymentResultSection>
          <PaymentResultTitle>결제예상금액</PaymentResultTitle>
          <PaymentResultPriceContainer>
            <PaymentResultText>결제예상금액</PaymentResultText>
            <PaymentResultText>21,000원</PaymentResultText>
          </PaymentResultPriceContainer>
          <PaymentResultOrderButton type="button">주문하기(2개)</PaymentResultOrderButton>
        </PaymentResultSection>
      </ProductCartContainer>
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

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;

  text-align: center;
`;

const Divider = styled.div`
  border-bottom: 4px solid rgba(170, 170, 170, 1);

  margin: 20px 8px;
`;

const ProductCartContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductCartDetailSection = styled.section`
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

const PaymentResultSection = styled.section`
  display: flex;
  flex-direction: column;
  position: sticky;
  justify-content: space-between;

  background-color: #ffffff;

  top: 0;
  left: 0;

  width: 500px;
  height: 260px;

  margin: 0 10px;
  padding: 10px;
  border: 2px solid #dddddd;

  @media screen and (max-width: 768px) {
    width: 100%;

    height: 140px;
    padding: 0;
    margin: 0;

    border: none;
    border-top: 2px solid #dddddd;
    bottom: 0;
  }
`;

const PaymentResultTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const PaymentResultPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PaymentResultText = styled.p`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;

  :after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: #2ac1bc;
    opacity: 0.5;
    z-index: -1;
  }
`;

const PaymentResultOrderButton = styled.button`
  background: #2ac1bc;
  border: none;
  font-size: 24px;
  color: white;
  width: 100%;
  padding: 20px;

  :hover {
    cursor: pointer;
    background-color: #209491;
  }
`;

const ProductCartHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const ProductCartHeaderLabel = styled.label``;

const Checkbox = styled.input`
  appearance: none;
  border: 1px solid #2ac1bc;
  border-radius: 2px;
  width: 1.75rem;
  height: 1.75rem;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :checked {
    background-color: #2ac1bc;
  }

  :after {
    content: "✔";
    width: 100%;
    height: 100%;
    font-size: 0.75rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProductCartHeaderDeleteButton = styled.button``;

const ProductListTitle = styled.h2`
  margin-top: 40px;
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 20px;
`;
