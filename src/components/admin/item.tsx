import { Product } from '@/dto'
import { localeNumber } from '@/utils'

const AdminProductItem = ({
  item: { id, price, name, imageUrl },
  deleteItem,
}: {
  item: Product
  deleteItem: (id: string) => void
}) => {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div className="flex justify-between items-center p-5">
        <div className="product-info">
          <span className="product-info__name">{name}</span>
          <span className="product-info__price">{localeNumber(price)}원</span>
        </div>
        <button className="delete-button" onClick={() => deleteItem(id)}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default AdminProductItem
