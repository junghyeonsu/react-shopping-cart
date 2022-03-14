import { OrderDetail, ValuePick } from '@/dto'
import { InfiniteData } from 'react-query'
import { queryClient, QueryKeys } from '.'

const cartMutationSuccessHandler = <T extends OrderDetail>(
  pages: ValuePick<InfiniteData<T[]>, 'pages'>,
  newItem: T,
) => {
  let targetIndex = 0
  const targetPage = pages.findIndex(page => {
    const searchedIndex = page.findIndex(
      item => item.productId === newItem.productId,
    )
    if (searchedIndex > -1) targetIndex = searchedIndex
    return true
  })
  const newPages = [...pages.map(page => [...page])]
  return { newPages, targetPage, targetIndex }
}

export const cartDeleteHandler = (items: OrderDetail[]) => {
  queryClient.setQueryData<InfiniteData<OrderDetail[]>>(
    QueryKeys.cart,
    ({ pageParams, pages } = { pageParams: [], pages: [] }) => {
      const newPages = [...pages.map(page => [...page])]
      items.forEach(item => {
        const { targetPage, targetIndex } = cartMutationSuccessHandler(
          newPages,
          item,
        )
        if (targetPage > -1 && targetIndex > -1) {
          newPages[targetPage].splice(targetIndex, 1)
        }
      })
      return { pageParams, pages: newPages }
    },
  )
}

export default cartMutationSuccessHandler
