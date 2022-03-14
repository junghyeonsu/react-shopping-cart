import { OrderDetail, Product } from '@/dto'
import { queryClient, QueryKeys, useAddCart, useGetCarts } from '@/api'
import ProductItem from '../product/item'
import { InfiniteData } from 'react-query'
import cartMutationSuccessHandler from '@/api/cartMutationHandler'
import useModal from '@/hooks/useModal'

const CartAddModal = () => {
  const { mutate: addCart } = useAddCart()
  const { data: modalData, setModal } = useModal()
  const { data } = useGetCarts()
  const item = modalData as Product

  const add = () => {
    if (!item) return
    addCart(item.id, {
      onSuccess: newItem => {
        setModal('cart_redirect')
        if (newItem.serverMessage) return
        queryClient.setQueryData<InfiniteData<OrderDetail[]>>(
          QueryKeys.cart,
          ({ pageParams, pages } = { pageParams: [], pages: [] }) => {
            const { newPages, targetPage, targetIndex } =
              cartMutationSuccessHandler(pages, newItem)

            if (targetPage > -1 && targetIndex > -1) {
              newPages[targetPage][targetIndex] = newItem
            } else {
              newPages[0].unshift(newItem)
            }
            return {
              pageParams,
              pages: newPages,
            }
          },
        )
      },
    })
  }

  if (!item) return null

  return (
    <div className="modal cart-modal">
      <h3 className="modal-header">장바구니에 담겠습니까?</h3>
      <div className="modal-content">
        <ProductItem item={item} productId={item.id} hideButton />
        <button onClick={add}>담기 &rarr;</button>
        <div className="recent-cart">
          <p>최신 장바구니 목록</p>
          <div className="flex">
            {data?.pages[0].slice(0, 3).map(item => (
              <ProductItem
                item={item.product}
                productId={item.productId}
                hideButton
                key={item.productId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartAddModal
