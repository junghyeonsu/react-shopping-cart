import { useEffect } from 'react'
import { QueryKeys, useGetCarts } from '@/api'
import EmptyPage from '@/modules/emptyPage'
import CartFormItem from './formItem'
import LoadingIndicator from '@/modules/loadingIndicator'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { setCartItems, toggleCartAll, toggleCartItem } from '@/redux/cartSlicer'
import InfiniteList from '@/modules/infiniteList'
import useModal from '@/hooks/useModal'

const CartForm = () => {
  const { setModal } = useModal()
  const { checkedIds, quantity, price, onSaleItems } = useAppSelector(
    state => state.cart,
  )
  const dispatch = useDispatch()
  const { data, isLoading } = useGetCarts()

  const toggleChecked = (id: string) => () => {
    dispatch(toggleCartItem(id))
  }
  const toggleAll = () => {
    if (!data) return
    dispatch(toggleCartAll())
  }
  const handleDeleteItem = (id: string) => () => {
    if (id) setModal('cart_delete', [id])
  }
  const handleDeleteItems = () => {
    if (checkedIds) setModal('cart_delete', checkedIds)
  }

  const handleOrderItems = () => {
    if (checkedIds.length) setModal('cart_confirm', checkedIds)
  }

  useEffect(() => {
    if (data) dispatch(setCartItems(data))
  }, [data])

  if (isLoading) return <LoadingIndicator isLoading={true} />

  if (!onSaleItems?.length)
    return (
      <EmptyPage
        description="장바구니가 비었어요."
        backTo="/"
        buttonText="홈으로"
      />
    )

  const allChecked = checkedIds.length === onSaleItems.length

  return (
    <div className="contents flex">
      <section className="cart-left-section">
        <div className="flex justify-between items-center">
          <div className="checkbox-container">
            <input
              className="checkbox"
              name="checkbox"
              type="checkbox"
              checked={allChecked}
              onChange={toggleAll}
            />
            <label className="checkbox-label" htmlFor="checkbox">
              {allChecked ? '전체해제' : '전체선택'}
            </label>
          </div>
          <h3 className="cart-title">선택상품({quantity}개)</h3>
          <button className="delete-button" onClick={handleDeleteItems}>
            선택삭제
          </button>
        </div>

        <InfiniteList
          wrapperClass=""
          Item={CartFormItem}
          queryKey={QueryKeys.cart}
          useFetch={useGetCarts}
          isChecked={(id: string) => checkedIds.includes(id)}
          toggleChecked={(id: string) => toggleChecked(id)}
          handleDelete={(id: string) => handleDeleteItem(id)}
          empty={{
            description: '',
          }}
        />
      </section>

      <section className="cart-right-section">
        <div className="cart-right-section__top">
          <h3 className="cart-title">결제예상금액</h3>
        </div>
        <hr className="divide-line-thin" />
        <div className="cart-right-section__bottom">
          <div className="flex justify-between p-20 mt-20">
            <span className="highlight-text">결제예상금액</span>
            <span className="highlight-text">{price}원</span>
          </div>
          <div className="flex-center mt-30 mx-10">
            <button
              className="button button--success button--full flex-center"
              onClick={handleOrderItems}
              disabled={!checkedIds.length}
            >
              주문하기({quantity}개)
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartForm
