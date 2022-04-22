import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useDevice from '@/hooks/useDevice';
import { useAppDispatch } from '@/store';
import { fetchCartList, getCartAll } from '@/store/cart';
import { formattedPrice, getCartTotalPrice } from '@/utils';
import { deleteCartItem } from '@/apis/cart';
import NoItems from '@/components/NoItems';
import { CartItemInfoI } from '@/models/cart';
import AlertModal from '@/components/Modal/AlertModal';
import { OrderDetailsI } from '@/models/order';
import { addOrder } from '@/apis/order';
import { useNavigate } from 'react-router-dom';

type ModalType = 'none' | 'deleteOne' | 'deleteSelected' | 'order';

const CardPage = () => {
  const device = useDevice();
  const isTablet = device === 'tablet';

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useSelector(getCartAll);

  const [isAllChecked, setIsAllChecked] = useState(true);
  const [cartItemInfo, setCartItemInfo] = useState<CartItemInfoI[]>([]);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [modalOpen, setModalOpen] = useState<ModalType>('none');

  useEffect(() => {
    dispatch(fetchCartList());
  }, []);

  useEffect(() => {
    const initialItemQuantity = cartItems.reduce((acc, curr) => {
      return [
        ...acc,
        {
          id: curr.id,
          price: curr.product.price,
          name: curr.product.name,
          imageUrl: curr.product.imageUrl,
          quantity: 1,
          isChecked: true,
        },
      ];
    }, [] as CartItemInfoI[]);
    setCartItemInfo(initialItemQuantity);
  }, [cartItems]);

  const toggleAllItems = () => {
    setIsAllChecked(!isAllChecked);
    const updateData = cartItemInfo.map((item) => ({
      ...item,
      isChecked: !isAllChecked,
    }));
    setCartItemInfo(updateData);
  };

  const toggleItemsToBuy = (itemId: number) => {
    const updateData = cartItemInfo.map((item) => {
      const isExistItem = item.id === itemId;
      return isExistItem
        ? {
            ...item,
            isChecked: !item.isChecked,
          }
        : item;
    });
    setCartItemInfo(updateData);
  };

  const deleteSelectedItems = async (itemIds: number[]) => {
    try {
      for await (const itemId of itemIds) {
        deleteCartItem(itemId);
      }
    } catch {
      console.error('선택한 물품 제거 에러');
    } finally {
      setModalOpen('none');
      setSelectedItems([]);
      dispatch(fetchCartList());
    }
  };

  const deleteCurrentItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
    } catch {
      console.error('장바구니 아이템 하나 제거 에러');
    } finally {
      setModalOpen('none');
      setSelectedItems([]);
      dispatch(fetchCartList());
    }
  };

  const setAmountOfItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: number,
  ) => {
    const updateData = cartItemInfo.map((existItem) => {
      const isExistItem = existItem.id === itemId;
      return isExistItem
        ? {
            ...existItem,
            quantity: e.target.valueAsNumber,
          }
        : existItem;
    });
    setCartItemInfo(updateData);
  };

  const handleAmountWithButton = (itemId: number, isIncrease: boolean) => {
    const updateData = cartItemInfo.map((existItem) => {
      const isExistItem = existItem.id === itemId;

      const isMinimumValue = existItem.quantity === 1 && !isIncrease;
      const isMaximumValue = existItem.quantity === 20 && isIncrease;
      if (isMinimumValue || isMaximumValue) return existItem;

      return isExistItem
        ? {
            ...existItem,
            quantity: existItem.quantity + (isIncrease ? 1 : -1),
          }
        : existItem;
    });
    setCartItemInfo(updateData);
  };

  const handleOrderItems = async () => {
    const selectedItems = cartItemInfo.filter((item) => item.isChecked);
    const orderItems = selectedItems.reduce<OrderDetailsI[]>((acc, curr) => {
      if (curr.isChecked) {
        return [
          ...acc,
          {
            id: curr.id,
            price: curr.price,
            name: curr.name,
            imageUrl: curr.imageUrl,
            quantity: curr.quantity,
          },
        ];
      }
      return acc;
    }, []);
    try {
      await addOrder(orderItems);
      const haveToDeleteItems = orderItems.map((item) => item.id);
      await deleteSelectedItems(haveToDeleteItems);
    } catch (err) {
      console.error(err);
    } finally {
      setModalOpen('none');
      setSelectedItems([]);
      navigate('/order', { state: orderItems });
    }
  };

  const selectedCartItemsTotalPrice = getCartTotalPrice(cartItemInfo);
  const selectedCartItemsLength = useMemo(
    () => cartItemInfo.filter((item) => item.isChecked).length,
    [cartItemInfo],
  );

  return (
    <>
      <section className="cart-section">
        <header className="flex-col-center mt-20">
          <h2 className="cart-section__title">장바구니</h2>
          <hr className="divide-line mt-20" />
        </header>

        {cartItemInfo?.length === 0 ? (
          <div className="flex justify-center mt-40">
            장바구니에 담긴 물건이 없습니다.
          </div>
        ) : (
          <div className="flex cart-section-wrap">
            <section className="cart-left-section">
              <div className="flex justify-between items-center">
                <div className="checkbox-container">
                  <input
                    className="checkbox pointer"
                    name="checkbox"
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={toggleAllItems}
                  />
                  <label className="checkbox-label" htmlFor="checkbox">
                    선택해제
                  </label>
                </div>
                <button
                  className="delete-button pointer"
                  onClick={() => {
                    setModalOpen('deleteSelected');
                    const checkedItems = cartItemInfo.filter(
                      (item) => item.isChecked,
                    );
                    const checkedItemsId = checkedItems.map((item) => item.id);
                    setSelectedItems(checkedItemsId);
                  }}
                >
                  상품삭제
                </button>
              </div>
              <h3 className="cart-title">
                든든배송 상품({cartItemInfo.length}개)
              </h3>
              <hr className="divide-line-gray mt-10" />

              {cartItemInfo.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <div className="cart-container">
                      <div className="flex gap-15 mt-10">
                        <input
                          className="checkbox"
                          name="checkbox"
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={() => toggleItemsToBuy(item.id)}
                        />
                        <img
                          className={isTablet ? 'w-120 h-120' : 'w-144 h-144'}
                          src={item.imageUrl}
                          alt={item.name}
                        />
                        <span className="cart-name">{item.name}</span>
                      </div>
                      <div className="flex-col-center justify-end gap-15">
                        <img
                          className="cart-trash-svg pointer"
                          src="assets/svgs/trash.svg"
                          alt="삭제"
                          onClick={() => {
                            setModalOpen('deleteOne');
                            setSelectedItems([item.id]);
                          }}
                        />
                        <div className="number-input-container">
                          <input
                            type="number"
                            className="number-input"
                            value={item.quantity}
                            min={1}
                            max={20}
                            onChange={(e) => setAmountOfItem(e, item.id)}
                          />
                          <div>
                            <button
                              className="number-input-button"
                              onClick={() =>
                                handleAmountWithButton(item.id, true)
                              }
                            >
                              ▲
                            </button>
                            <button
                              className="number-input-button"
                              onClick={() =>
                                handleAmountWithButton(item.id, false)
                              }
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                        <span className="cart-price">
                          {formattedPrice(item.price)}원
                        </span>
                      </div>
                    </div>
                    <hr className="divide-line-thin mt-10" />
                  </React.Fragment>
                );
              })}
            </section>
            <section className="cart-right-section">
              <div className="cart-right-section__top">
                <h3 className="cart-title">결제예상금액</h3>
              </div>
              <hr className="divide-line-thin" />
              <div className="cart-right-section__bottom">
                <div className="flex justify-between p-20 mt-20 order-right-section__amount">
                  <span className="highlight-text">결제예상금액</span>
                  <span className="highlight-text">
                    {formattedPrice(selectedCartItemsTotalPrice)}원
                  </span>
                </div>
                <div className="flex-center mt-30 mx-10 order-right-section__buy-button">
                  <button
                    className="primary-button flex-center pointer"
                    disabled={selectedCartItemsLength === 0}
                    onClick={() => setModalOpen('order')}
                  >
                    주문하기(
                    {selectedCartItemsLength}개)
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </section>
      <AlertModal
        type={modalOpen === 'order' ? '알림' : '경고'}
        isShow={modalOpen !== 'none'}
        description={
          modalOpen === 'order'
            ? '선택하신 상품을 주문하시겠습니까?'
            : '선택하신 상품을 장바구니에서 삭제하시겠습니까?'
        }
        onClose={() => setModalOpen('none')}
        onConfirm={() => {
          switch (modalOpen) {
            case 'deleteOne':
              deleteCurrentItem(selectedItems[0]);
              return;
            case 'deleteSelected':
              deleteSelectedItems(selectedItems);
              return;
            case 'order':
              handleOrderItems();
            default:
              return;
          }
        }}
      />
    </>
  );
};

export default CardPage;
