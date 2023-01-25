import styled from "@emotion/styled";

import type { ProductType } from "../types";

interface OrderProductItemProps {
  product: ProductType;
}

export default function OrderProductItem({ product }: OrderProductItemProps) {
  const { imageUrl, name, price, quantity } = product;

  const totalPrice = (price * quantity!).toLocaleString();

  return (
    <ItemContainer>
      <ItemImage src={imageUrl} alt="fakeimage" />
      <InfoSection>
        <ItemName>{name}</ItemName>
        <ItemAmount>수량: {quantity}개</ItemAmount>
        <ItemAmount>가격: {totalPrice}원</ItemAmount>
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
