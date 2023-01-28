import styled from "@emotion/styled";
import { Navigate, useParams } from "react-router-dom";

import { useProduct } from "../api/product";
import { isEmptyObject } from "../utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProduct(id!);

  if (isError) {
    return <p>에러가 발생했습니다.</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (isEmptyObject(data!)) {
    console.error(`${id}값에 해당하는 데이터가 없습니다.`);
    return <Navigate to="/products" />;
  }

  return (
    <Container>
      <Title>상품 상세</Title>
      <Image src={data ? data.imageUrl : ""} alt="product" />
      <Name>{data?.name}</Name>
      <Divider />
      <PriceBox>
        <p>금액</p>
        <p>{data?.price?.toLocaleString()}원</p>
      </PriceBox>
      <GoCartButton>장바구니에 담기</GoCartButton>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: auto;

  width: 100%;
  max-width: 600px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;

  margin: auto;

  margin-top: 20px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const Name = styled.p`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  padding: 0 8px;
`;

const Divider = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid rgba(170, 170, 170, 1);
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 8px;

  font-size: 22px;
`;

const GoCartButton = styled.button`
  margin: 8px;
  margin-top: 30px;
  padding: 8px 16px;

  height: 60px;
  font-size: 20px;

  border: none;

  background-color: rgba(115, 103, 92, 1);
  color: white;

  :hover {
    cursor: pointer;
    background-color: #4b443d;
  }
`;
