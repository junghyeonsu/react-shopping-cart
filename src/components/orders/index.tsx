import { QueryKeys, useGetOrderList } from '@/api'
import InfiniteList from '@/modules/infiniteList'
import OrdersDetails from './details'

const OrdersList = () => (
  <InfiniteList
    wrapperClass="contents"
    Item={OrdersDetails}
    queryKey={QueryKeys.orders}
    useFetch={useGetOrderList}
    empty={{
      description: '결제 내역이 없습니다.',
    }}
    showButton
  />
)

export default OrdersList
