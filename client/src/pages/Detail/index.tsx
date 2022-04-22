import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useDevice from '@/hooks/useDevice';
import { useAppDispatch } from '@/store';
import {
  fetchProductById,
  getIsProductLoading,
  getSelectedProduct,
} from '@/store/product';
import Loading from '@/components/Loading';
import { formattedPrice } from '@/utils';
import NoItems from '@/components/NoItems';
import AlertModal from '@/components/Modal/AlertModal';
import { ProductI } from '@/models/product';
import { addCartItem } from '@/apis/cart';

const DetailPage = () => {
  const device = useDevice();
  const isMobile = device === 'mobile';

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useSelector(getSelectedProduct);
  const isLoading = useSelector(getIsProductLoading);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id));
    }
  }, []);

  const addToCart = async (product: ProductI) => {
    setShowModal(true);
    await addCartItem(product);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {product.name ? (
        <div className="product-detail-container">
          <div
            className={isMobile ? 'flex-col-center' : 'flex-col-center w-520'}
          >
            <img
              className={isMobile ? 'mb-10' : 'w-480 h-480 mb-10'}
              src={product.imageUrl}
              alt={product.name}
            />
            <div className="product-detail-info">
              <span className="product-detail-info__name">{product.name}</span>
              <hr className="divide-line-gray my-20" />
              <div className="flex justify-between">
                <span>금액</span>
                <span className="product-detail-info__price">
                  {formattedPrice(product.price)}원
                </span>
              </div>
            </div>
            <button
              className="product-detail-button flex-center mt-20 pointer"
              onClick={() => addToCart(product)}
            >
              장바구니
            </button>
          </div>
          <AlertModal
            isShow={showModal}
            description="장바구니 페이지로 이동하시겠습니까?"
            onClose={() => setShowModal(false)}
            onConfirm={() => navigate('/cart')}
          />
        </div>
      ) : (
        <NoItems description="상품 상세가" />
      )}
    </>
  );
};

export default DetailPage;
