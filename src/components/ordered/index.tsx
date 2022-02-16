import { useGetOrderList } from '@/api'
import EmptyPage from '@/modules/emptyPage'
import LoadingIndicator from '@/modules/loadingIndicator'
import OrderedDetails from './details'

const OrderedList = () => {
  const { data, isLoading } = useGetOrderList()

  if (isLoading) return <LoadingIndicator isLoading={true} />
  if (!data)
    return (
      <EmptyPage
        description="결제 내역이 없어요."
        backTo="/"
        buttonText="홈으로"
      />
    )

  return (
    <div className="contents">
      {data.map(order => (
        <OrderedDetails {...order} key={order.id} />
      ))}
    </div>
  )
}

export default OrderedList
