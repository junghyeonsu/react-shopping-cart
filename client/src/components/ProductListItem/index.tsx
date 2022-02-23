import React from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../../examples/assets/svgs/cart.svg";
import { Product } from "../../types/product";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const navigation = useNavigate();

  const onClickCartIcon = (id: number) => {
    // TODO : 장바구니 페이지 구현 시 id값 받아서 장바구니에 추가
    navigation("/cart");
  };

  return (
    <div>
      <img
        src={product.imageUrl}
        width="283"
        height="283"
        alt="PET보틀-정사각(420ml)"
      />
      <div className="flex justify-between w-280 p-5">
        <div className="product-info">
          <span className="product-info__name">{product.name}</span>
          <span className="product-info__price">{product.price}원</span>
        </div>
        <button
          aria-label="cart-icon"
          className="cursor-pointer"
          onClick={() => onClickCartIcon(product.id)}
        >
          <img src={cartIcon} alt="장바구니" />
        </button>
      </div>
    </div>
  );
};

export default ProductListItem;
