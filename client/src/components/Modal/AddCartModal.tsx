import Portal from '@/components/Portal';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProductsAll, getRandomRecommendProducts } from '@/store/product';

interface ModalProps {
  title?: string;
  description?: string;
  isShow: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const AddCartModal = ({
  isShow,
  title = '알림',
  description,
  onClose,
  onConfirm,
}: ModalProps) => {
  const recommendedProducts = useSelector(getRandomRecommendProducts);

  return (
    <Portal elementId="modal">
      <div className={`modal-overlay ${isShow && 'show'}`}>
        <div className="modal-wrapper">
          <h3 className="modal-title">{title}</h3>
          <div className="modal-description">{description}</div>
          <div className="modal-buttons">
            <button onClick={onClose}>아니오</button>
            <button onClick={onConfirm}>예</button>
          </div>
          <div className="modal-recommended">
            <p className="modal-recommended-title">이런 상품은 어떠세요?</p>
            {recommendedProducts.map((list) => (
              <ul key={list.id}>
                <li>- {list.name}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default AddCartModal;
