import Portal from '@/components/Portal';
import { useSelector } from 'react-redux';
import { getRandomRecommendProducts } from '@/store/product';

interface ModalProps {
  type?: '알림' | '경고';
  description?: string;
  isShow: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  hasRecommended?: boolean;
}

const AlertModal = ({
  isShow,
  type = '알림',
  description,
  onClose,
  onConfirm,
  hasRecommended = false,
}: ModalProps) => {
  const recommendedProducts = useSelector(getRandomRecommendProducts);

  return (
    <Portal elementId="modal">
      <div className={`modal-overlay ${isShow && 'show'}`}>
        <div className="modal-wrapper">
          <h3 className="modal-title">{type}</h3>
          <div className="modal-description">{description}</div>
          <div className="modal-buttons">
            <button onClick={onClose}>아니오</button>
            <button onClick={onConfirm}>예</button>
          </div>
          {hasRecommended && (
            <div className="modal-recommended">
              <p className="modal-recommended-title">이런 상품은 어떠세요?</p>
              {recommendedProducts.map((list) => (
                <ul key={list.id}>
                  <li>- {list.name}</li>
                </ul>
              ))}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default AlertModal;
