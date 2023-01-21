import styled from "@emotion/styled";
import { Navigate, useParams } from "react-router-dom";

import { useProduct } from "../api/product";

export default function ProductDetailPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/products" />;
  }

  const { data, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러가 발생했습니다.</p>;
  }

  return (
    <Container>
      <Title>상품 상세</Title>
      <p>{data?.name}</p>
      <p>{data?.price}</p>
      <img src={data ? data.imageUrl : ""} alt="product" />
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Title = styled.h1`
  margin-top: 40px;
  font-size: 32px;
  font-weight: 700;
`;
