import { Fragment } from 'react'
import { useGetCarts } from '@/api'
import { localeNumber, getTotalQuantity, getTotalPrice } from '@/utils'
import EmptyPage from '@/modules/emptyPage'
import CartFormItem from './formItem'
import LoadingIndicator from '@/modules/loadingIndicator'

const CartForm = () => {
  const { data, isLoading } = useGetCarts()

  if (isLoading) return <LoadingIndicator isLoading={true} />

  if (!data)
    return (
      <EmptyPage
        description="장바구니가 비었어요."
        backTo="/"
        buttonText="홈으로"
      />
    )

  const totalQuantity = getTotalQuantity(data)
  const totalPrice = localeNumber(getTotalPrice(data))

  return (
    <div className="contents flex">
      <section className="cart-left-section">
        <div className="flex justify-between items-center">
          <div className="checkbox-container">
            <input className="checkbox" name="checkbox" type="checkbox" />
            <label className="checkbox-label" htmlFor="checkbox">
              선택해제
            </label>
          </div>
          <button className="delete-button">상품삭제</button>
        </div>
        <h3 className="cart-title">든든배송 상품({totalQuantity}개)</h3>
        {data.map((product, i) => (
          <Fragment key={i}>
            <hr className={`divide-line-${i === 0 ? 'gray' : 'thin'} mt-10`} />
            <CartFormItem {...product} />
          </Fragment>
        ))}
        <hr className="divide-line-thin mt-10" />
      </section>

      <section className="cart-right-section">
        <div className="cart-right-section__top">
          <h3 className="cart-title">결제예상금액</h3>
        </div>
        <hr className="divide-line-thin" />
        <div className="cart-right-section__bottom">
          <div className="flex justify-between p-20 mt-20">
            <span className="highlight-text">결제예상금액</span>
            <span className="highlight-text">{totalPrice}원</span>
          </div>
          <div className="flex-center mt-30 mx-10">
            <button className="primary-button flex-center">
              주문하기({totalQuantity}개)
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartForm
