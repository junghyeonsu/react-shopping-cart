import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeleteCarts, useGetCarts } from "../api/cart";
import CartProductItem from "../components/CartProductItem";
import PaymentInformation from "../components/PaymentInformation";
import type { RootState } from "../store";
import { deleteCheckedProducts, setProducts, toggleAllProducts } from "../store/slices/cart";

export default function CartsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetCarts();

  useEffect(() => {
    if (!data) return;

    const productsWithAmount = data.map((product) => ({
      ...product,
      quantity: 1,
    }));

    dispatch(setProducts(productsWithAmount));
  }, [data, dispatch]);

  const products = useSelector((state: RootState) => state.cart.products);
  const productCount = products.length;
  const isAllChecked = products.every((product) => product.checked);
  const totalPrice = products.reduce((acc, product) => {
    if (!product.checked) return acc;
    return acc + product.price * product.quantity!;
  }, 0);

  const checkedChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    dispatch(toggleAllProducts(!checked));
  };
  const deleteCheckedProductHandler = () => {
    const isConfirmed = window.confirm("선택한 상품들을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    const checkedProducts = products.filter((product) => product.checked);
    checkedProducts.forEach((product) => deleteCart({ id: product.id }));
  };

  const { mutate: deleteCart } = useDeleteCarts({
    onSuccess: () => {
      dispatch(deleteCheckedProducts());
    },
  });

  const movePaymentPage = () => {
    const isConfirmed = window.confirm("주문/결제 페이지로 이동하시겠습니까?");
    if (!isConfirmed) return;

    navigate(`/payment`);
  };

  return (
    <Container>
      <Title>장바구니</Title>
      <Divider />

      <ProductCartContainer>
        <ProductCartDetailSection>
          <ProductCartHeader>
            <ProductCartHeaderLabel>
              <Checkbox onChange={checkedChangeHandler} checked={isAllChecked} type="checkbox" />
              선택해제
            </ProductCartHeaderLabel>
            <ProductCartHeaderDeleteButton onClick={deleteCheckedProductHandler}>
              상품삭제
            </ProductCartHeaderDeleteButton>
          </ProductCartHeader>
          <ProductListTitle>상품 ({productCount}개)</ProductListTitle>

          <ProductList>
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </ProductList>
        </ProductCartDetailSection>

        <PaymentInformation
          title="결제예상금액"
          description="결제예상금액"
          amount={totalPrice}
          actionButtonText={`주문하기 (${productCount}개)`}
          onClickActionButton={movePaymentPage}
        />
      </ProductCartContainer>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  max-width: 1200px;

  margin: auto;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;

  text-align: center;
`;

const Divider = styled.div`
  border-bottom: 4px solid rgba(170, 170, 170, 1);

  margin: 20px 8px;
`;

const ProductCartContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductCartDetailSection = styled.section`
  display: flex;
  flex-direction: column;

  margin: auto;

  width: 100%;
  max-width: 700px;
  padding: 10px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const ProductCartHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const ProductCartHeaderLabel = styled.label``;

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

const ProductCartHeaderDeleteButton = styled.button``;

const ProductListTitle = styled.h2`
  margin-top: 40px;
`;

const ProductList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    padding-bottom: 140px;
  }
`;
