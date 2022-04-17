import { MOCK_DATAS } from '../../core/testing/test.data'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../core/testing/util'
import ProductCard from './ProductCard'

describe('컴포넌트 렌더링 테스트', () => {
  const currentProduct = MOCK_DATAS.products[0]
  const carts = MOCK_DATAS.carts

  const cartIdSet = new Set([...carts.map((cart) => cart.id)])
  const product = { ...currentProduct, isCartEntered: cartIdSet.has(currentProduct.id) }

  it('상품 이름과 가격이 정상적으로 렌더링된다.', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(product.price)).toBeInTheDocument()
  })
})
