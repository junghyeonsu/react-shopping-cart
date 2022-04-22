import React from "react";

interface Props {
  title: string;
}

const index = ({ title }: Props) => {
  return (
    <header className="flex-col-center mt-20">
      <h2 className="cart-section__title">{title}</h2>
      <hr className="divide-line mt-20" />
    </header>
  );
};

export default index;
