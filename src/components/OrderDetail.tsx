import React from "react";
import { OrderDetailProps } from "../types/dto";

function OrderDetail({ orderDetail }: OrderDetailProps) {
  const { name, imageUrl, quantity } = orderDetail;
  return (
    <React.Fragment>
      <div className="order-container">
        <div className="flex gap-15 mt-10">
          <img
            className="w-144 h-144"
            src={imageUrl}
            alt={name}
            loading="lazy"
          />
          <div className="flex-col gap-15">
            <span className="order-name">{name}</span>
            <span>{`수량: ${quantity}`}</span>
          </div>
        </div>
      </div>
      <hr className="divide-line-thin mt-10" />
    </React.Fragment>
  );
}

export default OrderDetail;
