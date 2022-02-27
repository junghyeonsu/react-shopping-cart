import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeModal } from "../modules/Modal";

function Modal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateCart = () => {
    dispatch(closeModal());
    navigate("/cart");
  };

  const isCloseModal = (event: any) => {
    if (event.target.className.includes("modal-container")) {
      dispatch(closeModal());
    }
  };

  return (
    <div className="modal-container flex-center" onClick={isCloseModal}>
      <div className="modal flex-col-center gap-15">
        <p>장바구니로 이동하시겠습니까?</p>
        <button className="add-cart" onClick={navigateCart}>
          장바구니 이동
        </button>
      </div>
    </div>
  );
}

export default Modal;
