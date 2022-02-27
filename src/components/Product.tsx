import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postCart } from "../modules/Carts";
import { ProductProps, GetProdutResponse } from "../types/dto";
import cart from "../assets/svgs/cart.svg";

function Products({ product }: ProductProps) {
  const { id, name, price, imageUrl } = product;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCart = (product: GetProdutResponse) => {
    dispatch(postCart(product));
    navigate("/cart");
  };

  return (
    <div>
      <img
        className="w-280 h280"
        src={imageUrl}
        alt={`${name}`}
        loading="lazy"
      />
      <div className="flex justify-between w-280 p-5">
        <div className="product-info">
          <span className="product-info__name">{name}</span>
          <span className="product-info__price">
            {price.toLocaleString()}원
          </span>
        </div>
        <img
          src={cart}
          alt="장바구니"
          onClick={() => addCart({ id, name, price, imageUrl })}
        />
      </div>
    </div>
  );
}

export default Products;
