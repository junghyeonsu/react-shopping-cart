import React, { ChangeEvent } from "react";

import TrashIcon from "../../examples/assets/svgs/trash.svg";
import { Product } from "../../types/dto";

interface Props {
  checked: boolean;
  quantity: number;
  product: Product;
  onChangeChecked: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickQuantityPlusButton: () => void;
  onClickQuantitySubtractButton: () => void;
  onBlurQuantity: () => void;
  onClickTrashIcon: () => void;
}

const Index = ({
  checked,
  quantity,
  product,
  onChangeChecked,
  onChangeQuantity,
  onClickQuantityPlusButton,
  onClickQuantitySubtractButton,
  onBlurQuantity,
  onClickTrashIcon,
}: Props) => {
  return (
    <div className="cart-container">
      <div className="flex gap-15 mt-10">
        <input
          className="checkbox"
          name="checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChangeChecked}
        />
        <img
          className="w-144 h-144"
          src={product.imageUrl}
          alt={product.name}
        />
        <span className="cart-name">{product.name}</span>
      </div>
      <div className="flex-col-center justify-end gap-15">
        <button
          className="cart-trash-svg cursor-pointer"
          onClick={onClickTrashIcon}
        >
          <img src={TrashIcon} alt="삭제" />
        </button>
        <div className="number-input-container">
          <input
            type="number"
            className="number-input"
            value={quantity}
            onChange={onChangeQuantity}
            onBlur={onBlurQuantity}
          />
          <div>
            <button
              className="number-input-button"
              onClick={onClickQuantityPlusButton}
            >
              ▲
            </button>
            <button
              className="number-input-button"
              onClick={onClickQuantitySubtractButton}
            >
              ▼
            </button>
          </div>
        </div>
        <span className="cart-price">{product.price * quantity}원</span>
      </div>
    </div>
  );
};

export default Index;
