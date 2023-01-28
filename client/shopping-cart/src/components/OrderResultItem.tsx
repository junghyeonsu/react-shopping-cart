import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { usePostCarts } from "../api/cart";
import { addProduct } from "../store/slices/cart";
import type { OrderDetailType } from "../types";

interface OrderResultItemProps {
  orderDetail: OrderDetailType;
}

export default function OrderResultItem({ orderDetail }: OrderResultItemProps) {
  const { name, price, imageUrl, quantity } = orderDetail;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: postProductInCart } = usePostCarts({
    onSuccess: () => {
      dispatch(
        addProduct({
          quantity: 1,
          id: orderDetail.id,
          name: orderDetail.name,
          price: orderDetail.price,
          imageUrl: orderDetail.imageUrl,
          checked: true,
        }),
      );
      navigate(`/carts`);
    },
  });

  const moveCartsPage = () => {
    postProductInCart({
      product: {
        id: orderDetail.id,
        name: orderDetail.name,
        price: orderDetail.price,
        imageUrl: orderDetail.imageUrl,
        checked: true,
      },
    });
  };

  return (
    <ItemContainer>
      <InfoLeftSection>
        <ItemImage src={imageUrl} alt={name} />
        <InfoSection>
          <ItemName>{name}</ItemName>
          <ItemAmount>
            {price.toLocaleString()}원 / 수량: {quantity}개
          </ItemAmount>
        </InfoSection>
      </InfoLeftSection>
      <GoCartButton onClick={moveCartsPage}>장바구니</GoCartButton>
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
