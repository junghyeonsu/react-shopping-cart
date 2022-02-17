import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { fetchProducts, getIsProductLoading, getProductsAll } from '@/store/product';
import { formattedPrice } from '@/utils';
import { addCartItem } from '@/apis/cart';
import { ProductI } from '@/models/product';
import AddCartModal from '@/components/Modal/AddCartModal';
import { fetchCartList } from '@/store/cart';
import Loading from '@/components/Loading';

const ListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useSelector(getProductsAll);
  const isLoading = useSelector(getIsProductLoading)

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductI>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const goToProductDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const addToCartAndNavigate = (cartItem: ProductI) => {
    return addCartItem(cartItem).then(() => navigate('/cart'));
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className="product-container">
      {products ? (
        <>
          {products.map((product) => (
            <div key={product.id}>
              <img
                data-testid="product-image"
                className="w-280 h-280 pointer"
                src={product.imageUrl}
                alt={product.name}
                onClick={() => goToProductDetail(product.id)}
              />
              <div className="flex justify-between w-280 p-5">
                <div className="product-info">
                  <span className="product-info__name">{product.name}</span>
                  <span className="product-info__price">
                    {formattedPrice(product.price)}원
                  </span>
                </div>
                <img
                  src="/assets/svgs/cart.svg"
                  alt="장바구니"
                  className="pointer"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedProduct(product);
                  }}
                />
              </div>
            </div>
          ))}
          <AddCartModal
            isShow={showModal}
            description="장바구니에 담으시겠습니까?"
            onClose={() => setShowModal(false)}
            onConfirm={() =>
              selectedProduct && addToCartAndNavigate(selectedProduct)
            }
          />
        </>
      ) : (
        <div className="flex justify-center">등록된 상품이 없습니다.</div>
      )}
    </section>
  );
};

export default ListPage;
