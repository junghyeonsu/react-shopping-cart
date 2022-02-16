import { useNavigate } from 'react-router-dom'
import { GetCartResponse, Product } from '@/dto'
import { queryClient, QueryKeys, useAddCart, useGetCarts } from '@/api'
import ModalPortal from '@/modules/modalPortal'
import ProductItem from './item'

const CartModal = ({
  closeModal,
  item,
}: {
  closeModal: () => void
  item: Product | null
}) => {
  const { mutate: onAdd } = useAddCart()
  const navigate = useNavigate()
  const { data } = useGetCarts()

  const addCart = () => {
    if (item) {
      onAdd(item.id, {
        onSuccess: newItem => {
          queryClient.setQueryData<GetCartResponse[]>(QueryKeys.cart, old => {
            const newList = [...(old || [])]
            const prevIndex =
              newList?.findIndex(
                item => item.productId === newItem.productId,
              ) || -1
            if (prevIndex > -1) {
              newList.splice(prevIndex, 1, newItem)
              return newList
            }
            newList.push(newItem)
            return newList
          })
          navigate('/cart')
        },
      })
    }
  }

  if (!item) return null

  return (
    <ModalPortal>
      <div className="modal-dimmed" onClick={closeModal} />
      <div className="modal cart-modal">
        <div>
          <p>장바구니에 담겠습니까?</p>
          <ProductItem item={item} hideButton />
        </div>
        <button onClick={addCart}>담기 &rarr;</button>
        <div className="recent-cart">
          <p>최신 장바구니 목록</p>
          <div className="flex">
            {data?.slice(0, 3).map(item => (
              <ProductItem
                item={item.product}
                hideButton
                key={item.productId}
              />
            ))}
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default CartModal
