import { createRef, SyntheticEvent } from 'react'
import { ProductRequest } from '@/dto'
import { iterToObj } from '@/utils'

const AdminForm = ({
  handleSubmit,
}: {
  handleSubmit: (data: ProductRequest) => void
}) => {
  const inputRefs = Array.from({ length: 3 }).map(() =>
    createRef<HTMLInputElement>(),
  )
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const res = iterToObj(data.entries()) as ProductRequest
    handleSubmit(res)
    inputRefs.forEach(ref => (ref.current!.value = ''))
  }
  return (
    <form onSubmit={onSubmit}>
      <label>추가</label>
      <input
        ref={inputRefs[0]}
        type="text"
        name="name"
        placeholder="상품명"
        data-testid="admin-form-name"
      />
      <input
        ref={inputRefs[1]}
        type="text"
        name="imageUrl"
        placeholder="이미지 url"
        data-testid="admin-form-image"
      />
      <input
        ref={inputRefs[2]}
        type="number"
        name="price"
        placeholder="가격"
        data-testid="admin-form-price"
      />
      <button type="submit" data-testid="admin-form-submit">
        전송
      </button>
    </form>
  )
}

export default AdminForm
