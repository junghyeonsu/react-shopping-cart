import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, getCartLoadingStatus } from '../../core/redux/store'
import { fetchCartList } from '../../core/redux/slice/cart'
import styled from '@emotion/styled'
import PageHeader from '../../components/Header/PageHeader'
import CartBillSection from './CartBillSection'
import CartItemListSection from './CartItemListSection'
const Cart = () => {
  const dispatch = useDispatch()
  const loadingStatus = useSelector(getCartLoadingStatus)
  const cartItems = useSelector(getCartItems)

  const fetchCarts = async () => {
    await dispatch(fetchCartList())
  }

  useEffect(() => {
    fetchCarts()
  }, [])

  if (loadingStatus !== 'idle') {
    return <div>Loading...</div>
  }

  return (
    <CartSection>
      <PageHeader title="장바구니" />
      <div className="detail-container">
        <CartItemListSection cartItems={cartItems} />
        <CartBillSection />
      </div>
    </CartSection>
  )
}

const CartSection = styled.section`
  padding: 24px 300px;

  .detail-container {
    display: flex;
  }
`

export default Cart
