import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import Layout from "../components/Layout";

import PageTitle from "../components/PageTitle";
import CartListItem from "../components/CartListItem";
import TotalPriceWithButton from "../components/TotalPriceWithButton";
import { RootState } from "../redux/reducers";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { PATH } from "../constants";
import { useNavigate } from "react-router-dom";
import { OrderDetail } from "../types/dto";

const Cart = () => {
  const [checkAll, setCheckAll] = useState(true);
  const [checkboxes, setCheckboxes] = useState<boolean[]>();
  const [quantities, setQuantities] = useState<number[]>();
  const [totalPrice, setTotalPrice] = useState(0);

  const navigation = useNavigate();

  const { getCartProducts, deleteCartProduct, postPaymentProducts } =
    useActions();
  const { products } = useSelector((state: RootState) => state.carts);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  useEffect(() => {
    if (products) {
      setCheckboxes(products.map(() => true));
      setQuantities(products.map(() => 1));
    }
  }, [products]);

  useEffect(() => {
    if (products && checkboxes && quantities) {
      const totalPrice = products.reduce(
        (acc, cur, idx) =>
          (acc = checkboxes[idx]
            ? acc + cur.product.price * quantities[idx]
            : acc),
        0
      );
      setTotalPrice(totalPrice);
    }
  }, [checkboxes, products, quantities]);

  useEffect(() => {
    if (checkboxes) {
      const isAllChecked = checkboxes.every(Boolean);
      isAllChecked ? setCheckAll(true) : setCheckAll(false);
    }
  }, [checkboxes]);

  const onChangeChecked = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const copyCheckboxes = [...checkboxes!];
    copyCheckboxes[index] = e.target.checked;
    setCheckboxes(copyCheckboxes);
  };

  const onChangeCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setCheckAll(checked);
    const copyCheckboxes = [...checkboxes!];
    checkboxes?.forEach((_, index) => {
      copyCheckboxes[index] = checked;
      setCheckboxes(copyCheckboxes);
    });
  };

  const onChangeQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const copyQuantities = [...quantities!];
    copyQuantities[index] = Number(value);
    setQuantities(copyQuantities);
  };

  const onBlurQuantity = (index: number) => {
    const copyQuantities = [...quantities!];

    if (quantities![index] > 20) {
      alert("수량을 초과했습니다.\n수량은 20개를 넘을 수 없습니다.");
      copyQuantities[index] = 20;
    } else if (quantities![index] < 1) {
      alert("최소 수량은 1개 이상입니다.");
      copyQuantities[index] = 1;
    }

    setQuantities(copyQuantities);
  };

  const onClickQuantityButton = (
    index: number,
    calculate: "add" | "subtract"
  ) => {
    const copyQuantities = [...quantities!];
    copyQuantities[index] =
      calculate === "add"
        ? copyQuantities[index] + 1
        : copyQuantities[index] - 1;

    copyQuantities[index] =
      copyQuantities[index] > 1 ? copyQuantities[index] : 1;
    copyQuantities[index] =
      copyQuantities[index] < 20 ? copyQuantities[index] : 20;
    setQuantities(copyQuantities);
  };

  const onClickDeleteCartList = () => {
    if (window.confirm("모두 삭제하시겠습니까?")) {
      products?.forEach((product) => {
        deleteCartProduct(product.id, () => getCartProducts());
      });
    }
  };

  const onClickTrashIcon = (id: number) => {
    if (window.confirm("해당 제품을 삭제하시겠습니까?"))
      deleteCartProduct(id, () => getCartProducts());
  };

  const onClickOrder = () => {
    if (window.confirm("주문하시겠습니까?")) {
      const paymentProducts: OrderDetail[] = [];
      products?.forEach((product, index) => {
        if (checkboxes![index]) {
          paymentProducts.push({
            ...product.product,
            quantity: quantities![index],
          });
          deleteCartProduct(product.id);
        }
      });
      postPaymentProducts(paymentProducts, () => navigation(PATH.PAYMENT));
    }
  };

  const getButtonDisabled = () => {
    return !products?.length || !checkboxes?.some(Boolean);
  };

  return (
    <Layout>
      <section className="cart-section">
        <PageTitle title="장바구니" />

        <div className="flex">
          <section className="cart-left-section">
            <div className="flex justify-between items-center">
              <div className="checkbox-container">
                <input
                  className="checkbox"
                  name="checkbox"
                  type="checkbox"
                  checked={checkAll}
                  onChange={onChangeCheckAll}
                />
                <label className="checkbox-label" htmlFor="checkbox">
                  모두선택
                </label>
              </div>
              <button
                className="delete-button cursor-pointer"
                onClick={onClickDeleteCartList}
              >
                상품삭제
              </button>
            </div>
            <h3 className="cart-title">든든배송 상품({products?.length}개)</h3>
            <hr className="divide-line-gray mt-10" />
            {products && checkboxes && quantities
              ? products.map(({ id, product }, index) => (
                  <Fragment key={id}>
                    <CartListItem
                      checked={checkboxes[index]}
                      product={product}
                      onChangeChecked={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeChecked(e, index)
                      }
                      quantity={quantities[index]}
                      onChangeQuantity={(e: ChangeEvent<HTMLInputElement>) =>
                        onChangeQuantity(e, index)
                      }
                      onClickQuantityPlusButton={() =>
                        onClickQuantityButton(index, "add")
                      }
                      onClickQuantitySubtractButton={() =>
                        onClickQuantityButton(index, "subtract")
                      }
                      onBlurQuantity={() => onBlurQuantity(index)}
                      onClickTrashIcon={() => onClickTrashIcon(id)}
                    />
                    <hr className="divide-line-thin mt-10" />
                  </Fragment>
                ))
              : "Loading..."}
          </section>
          <TotalPriceWithButton
            title="결제예상금액"
            content="결제예상금액"
            price={totalPrice}
            buttonContent={`주문하기(${products?.length}개)`}
            buttonDisabled={getButtonDisabled()}
            onClickButton={onClickOrder}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
