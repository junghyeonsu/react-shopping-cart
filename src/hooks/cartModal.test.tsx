import { renderHook, act } from '@testing-library/react-hooks'
import useCartModal from './useCartModal'

test('useCartModal', () => {
  const testItem = {
    id: 'a',
    price: 1000,
    name: '테스트',
    imageUrl: 'http://abc.com/1.jpg',
    createdAt: {
      seconds: 0,
      nanoseconds: 0,
    },
  }
  const { result } = renderHook(() => useCartModal())
  const { showModal, closeModal } = result.current

  expect(result.current.modalComponent).toBe(null)

  act(() => showModal(testItem))
  expect(result.current.modalComponent).not.toBe(null)

  act(() => closeModal())
  expect(result.current.modalComponent).toBe(null)
})
