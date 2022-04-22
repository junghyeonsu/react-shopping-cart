import { useSelector } from 'react-redux';
import Portal from '../Portal';
import { getProductHasError } from '@/store/product';
import { getOrderHasError } from '@/store/order';
import { getCartHasError } from '@/store/cart';

const ErrorModal = () => {
  const productError = useSelector(getProductHasError);
  const orderError = useSelector(getOrderHasError);
  const cartError = useSelector(getCartHasError);

  const refreshPage = () => {
    location.reload();
  };

  const hasError = productError || orderError || cartError;

  return (
    <Portal elementId="error-modal">
      <div className={`modal-overlay ${hasError && 'show'}`}>
        <div className="modal-wrapper">
          <h3 className="modal-title">경고</h3>
          <div className="modal-description">
            알 수 없는 에러가 발생했습니다. <br />
            다시 시도해주세요.
          </div>
          <div className="modal-buttons">
            <button onClick={refreshPage}>확인</button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ErrorModal;
