import React from "react";

interface Props {
  title: string;
  content: string;
  price: number;
  buttonContent: string;
  buttonDisabled?: boolean;
  onClickButton: () => void;
}

const index = ({
  title,
  content,
  price,
  buttonContent,
  buttonDisabled,
  onClickButton,
}: Props) => {
  return (
    <section className="order-right-section">
      <div className="order-right-section__top">
        <h3 className="order-title">{title}</h3>
      </div>
      <hr className="divide-line-thin" />
      <div className="order-right-section__bottom">
        <div className="flex justify-between p-20 mt-20">
          <span className="highlight-text">{content}</span>
          <span className="highlight-text">{price}원</span>
        </div>
        <div className="flex-center mt-30 mx-10">
          <button
            className="primary-button flex-center cursor-pointer"
            disabled={buttonDisabled}
            onClick={onClickButton}
          >
            {buttonContent}
          </button>
        </div>
      </div>
    </section>
  );
};

export default index;
