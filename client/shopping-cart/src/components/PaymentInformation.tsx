import styled from "@emotion/styled";

interface PaymentInformationProps {
  title: string;
  description: string;
  amount: number;
  actionButtonText: string;
  actionButtonDisabled: boolean;
  onClickActionButton: () => void;
}

export default function PaymentInformation({
  title,
  description,
  amount,
  actionButtonText,
  actionButtonDisabled,
  onClickActionButton,
}: PaymentInformationProps) {
  return (
    <PaymentResultSection>
      <PaymentResultTitle>{title}</PaymentResultTitle>
      <PaymentResultPriceContainer>
        <PaymentResultText>{description}</PaymentResultText>
        <PaymentResultText>{amount.toLocaleString()}원</PaymentResultText>
      </PaymentResultPriceContainer>
      <PaymentResultOrderButton
        disabled={actionButtonDisabled}
        type="button"
        onClick={onClickActionButton}
      >
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
    position: fixed;
    top: unset;
    bottom: 0;
    left: 0;

    width: 100%;

    height: 140px;
    padding: 0;
    margin: 0;

    border: none;
    border-top: 2px solid #dddddd;
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

  :disabled {
    background-color: #dddddd;
    color: #aaaaaa;
    pointer-events: none;

    :hover {
      cursor: not-allowed;
    }
  }
`;
