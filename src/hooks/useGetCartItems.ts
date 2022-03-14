import { OrderDetail } from '@/dto'
import { useAppSelector } from '@/redux/store'

const useGetCartItems = () => {
  const { items } = useAppSelector(state => state.cart)
  const getSelectedItems = (ids: string[]) =>
    ids.reduce<OrderDetail[]>((res, id) => {
      const item = items.find(stateItem => stateItem.productId === id)
      if (item) res.push(item)
      return res
    }, [])

  return getSelectedItems
}

export default useGetCartItems
