import { Product, ProductRequest } from '@/dto'
import {
  queryClient,
  QueryKeys,
  useAddProduct,
  useDeleteProduct,
  useGetProductList,
} from '@/api'
import InfiniteList from '@/modules/infiniteList'
import AdminForm from './form'
import AdminProductItem from './item'
import { InfiniteData } from 'react-query'

const Admin = () => {
  const { mutate: onAdd } = useAddProduct()
  const { mutate: onDelete } = useDeleteProduct()

  const addItem = (data: ProductRequest) =>
    onAdd(data, {
      onSuccess: newProduct => {
        queryClient.setQueryData<InfiniteData<Product[]>>(
          QueryKeys.products,
          ({ pageParams, pages } = { pageParams: [], pages: [] }) => {
            pages[0].unshift(newProduct)
            return {
              pageParams,
              pages,
            }
          },
        )
      },
    })

  const deleteItem = (id: string) =>
    onDelete(id, {
      onSuccess: () => {
        queryClient.setQueryData<InfiniteData<Product[]>>(
          QueryKeys.products,
          ({ pageParams, pages } = { pageParams: [], pages: [] }) => ({
            pageParams,
            pages: pages.map(
              (data: Product[]) => data?.filter(d => d.id !== id) || [],
            ),
          }),
        )
      },
    })

  return (
    <div className="contents">
      <AdminForm handleSubmit={addItem} />
      <InfiniteList
        wrapperClass="product-container"
        Item={AdminProductItem}
        queryKey={QueryKeys.products}
        useFetch={useGetProductList}
        deleteItem={deleteItem}
        empty={{
          description: '목록이 비었습니다. 상품을 추가해 주세요.',
        }}
      />
    </div>
  )
}

export default Admin
