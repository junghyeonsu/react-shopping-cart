import { useState } from 'react'
import CartModal from '@/components/product/cartModal'
import { Product } from '@/dto'

const useCartModal = () => {
  const [modalItem, setModalItem] = useState<Product | null>(null)
  const showModal = (item: Product) => {
    setModalItem(item)
  }
  const closeModal = () => {
    setModalItem(null)
  }

  return {
    modalComponent: modalItem ? (
      <CartModal item={modalItem} closeModal={closeModal} />
    ) : null,
    showModal,
    closeModal,
  }
}

export default useCartModal
