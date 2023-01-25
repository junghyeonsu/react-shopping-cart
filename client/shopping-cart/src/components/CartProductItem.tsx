import styled from "@emotion/styled";
import { useDispatch } from "react-redux";

import { useDeleteCarts } from "../api/cart";
import {
  changeQuantity,
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
  toggleProduct,
} from "../store/slices/cart";
import type { ProductType } from "../types";

interface CartProductItemProps {
  product: ProductType;
}

export default function CartProductItem({ product }: CartProductItemProps) {
  const { id, imageUrl, name, price, quantity, checked } = product;
  const dispatch = useDispatch();

  const increaseQuantityHandler = () => dispatch(increaseQuantity(id));
  const decreaseQuantityHandler = () => dispatch(decreaseQuantity(id));
  const quantityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === "") return;
    const quantity = Number(value);
    if (quantity < 1 || quantity > 20) return;
    dispatch(changeQuantity({ id, quantity }));
  };
  const checkedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    dispatch(toggleProduct({ id, checked: !checked }));
  };
  const deleteHandler = () => {
    const isConfirmed = window.confirm("해당 상품을 정말 삭제하시겠습니까?");
    if (!isConfirmed) return;

    deleteCart({ id });
  };

  const calculatedPrice = (price * quantity!).toLocaleString();

  const { mutate: deleteCart } = useDeleteCarts({
    onSuccess: () => {
      dispatch(deleteProduct(id));
    },
  });

  return (
    <Container key={id}>
      <InfoSection>
        <Checkbox type="checkbox" onChange={checkedChangeHandler} checked={checked} />
        <ItemImage src={imageUrl} alt="fakeimage" />
        <ItemName>{name}</ItemName>
      </InfoSection>
      <ModulateSection>
        <ItemDeleteButton type="button" onClick={deleteHandler}>
          <DeleteIcon />
        </ItemDeleteButton>
        <ItemCountSection>
          <ItemCountInput
            onChange={quantityChangeHandler}
            max={20}
            min={1}
            value={quantity}
            type="number"
          />
          <ItemCountButtonContainer>
            <ItemCountButton onClick={increaseQuantityHandler}>▲</ItemCountButton>
            <ItemCountButton onClick={decreaseQuantityHandler}>▼</ItemCountButton>
          </ItemCountButtonContainer>
        </ItemCountSection>
        <ItemPrice>{calculatedPrice}원</ItemPrice>
      </ModulateSection>
    </Container>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M0 0H24V24H0V0Z" fill="url(#pattern0)" />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_24_356" transform="scale(0.025)" />
        </pattern>
        <image
          id="image0_24_356"
          width="40"
          height="40"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURbu7u////729vbu7u7y8vLy8vLy8vEdwTLy8vLy8vLy8vL+/v7u7u7y8vLu7u7u7u729vbu7u7+/v7u7u7u7u7u7u7u7u7y8vL6+vru7u7y8vL29vbu7u7u7u7y8vLy8vLu7u7u7u6hNFAIAAAAhdFJOU4ABRsRoNnsAf4N6JJOSfL2+fTBxzPxXvzN4b1Z1zcCC+y6w4fIAAACdSURBVDjL7dTJDsIgFEBROvponedZ7///pKYmDS3QIBuN8W7K4iSEqWoUmIqA9bZSnapT7YKrDVb3ow33OFta8ABr3Z1aX+BsQQXWwm6wsKA4oIapAaVpDjvpdYXZa9RAAnoPSkBxRxgAXXvY39/vgc+DFPP7h78LP3HNxAfFhCVkylMGZQvT4deftjAZD7lJYrzrIvdNnRfxP/vhHjYnSVqiKRrnAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

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

const Container = styled.li`
  display: flex;
  justify-content: space-between;

  border-top: 3px solid #dddddd;
  padding: 20px 0;
`;

const ItemImage = styled.img`
  width: 144px;
  height: 144px;
`;

const ItemName = styled.div``;

const InfoSection = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 6px;
`;

const ModulateSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;

  gap: 6px;
`;

const ItemDeleteButton = styled.button`
  border: none;

  :hover {
    cursor: pointer;
  }
`;

const ItemCountSection = styled.div`
  display: flex;
  align-items: center;
`;

const ItemCountInput = styled.input`
  width: 72px;
  height: 58px;
  border: 1px solid #dddddd;
  text-align: center;
  font-size: 24px;

  :focus {
    outline: none;
  }
`;

const ItemCountButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemCountButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  border: 1px solid #dddddd;
  font-size: 100%;
  cursor: pointer;
`;

const ItemPrice = styled.p``;
