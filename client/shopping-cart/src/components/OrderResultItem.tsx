import styled from "@emotion/styled";

export default function OrderResultItem() {
  return (
    <ItemContainer>
      <InfoLeftSection>
        <ItemImage src="https://fakeimg.pl/300/" alt="fakeimage" />
        <InfoSection>
          <ItemName>[든든] 야채바삭 김말이 700g</ItemName>
          <ItemAmount>16,600원 / 수량: 4개</ItemAmount>
        </InfoSection>
      </InfoLeftSection>
      <GoCartButton>장바구니</GoCartButton>
    </ItemContainer>
  );
}

const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  border-top: 3px solid #dddddd;
  padding: 20px 0;
  gap: 10px;
`;

const InfoLeftSection = styled.div`
  display: flex;

  gap: 10px;
`;

const ItemImage = styled.img`
  width: 144px;
  height: 144px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 20px;
`;

const ItemName = styled.p`
  font-size: 20px;
`;
const ItemAmount = styled.p``;

const GoCartButton = styled.button`
  background: #2ac1bc;
  font-size: 20px;
  border: none;
  color: white;
  padding: 14px 28px;
`;
