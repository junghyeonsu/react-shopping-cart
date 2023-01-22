import styled from "@emotion/styled";

interface PaymentInformationProps {
  payment: number;
  actionButtonText: string;
  onClickActionButton: () => void;
}

export default function PaymentInformation({
  onClickActionButton,
  actionButtonText,
  payment,
}: PaymentInformationProps) {
  return (
    <PaymentResultSection>
      <PaymentResultTitle>결제예상금액</PaymentResultTitle>
      <PaymentResultPriceContainer>
        <PaymentResultText>결제예상금액</PaymentResultText>
        <PaymentResultText>{payment.toLocaleString()}원</PaymentResultText>
      </PaymentResultPriceContainer>
      <PaymentResultOrderButton type="button" onClick={onClickActionButton}>
        {actionButtonText}
      </PaymentResultOrderButton>
    </PaymentResultSection>
  );
}

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
