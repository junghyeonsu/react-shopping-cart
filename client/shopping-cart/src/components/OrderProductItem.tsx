import styled from "@emotion/styled";

export default function OrderProductItem() {
  return (
    <ItemContainer>
      <ItemImage src="https://fakeimg.pl/300/" alt="fakeimage" />
      <InfoSection>
        <ItemName>[든든] 야채바삭 김말이 700g</ItemName>
        <ItemAmount>수량: 4개</ItemAmount>
      </InfoSection>
    </ItemContainer>
  );
}

const ItemContainer = styled.li`
  display: flex;

  border-top: 3px solid #dddddd;
  padding: 20px 0;
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
