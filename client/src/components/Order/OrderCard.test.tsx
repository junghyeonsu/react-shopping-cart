import { MOCK_DATAS } from '../../core/testing/test.data'
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../core/testing/util'
import OrderCard from './OrderCard'

describe('컴포넌트 렌더링 테스트', () => {
  const order = MOCK_DATAS.orders[0]
  it('주문 카드에 주문에 포함된 상품의 이름이 정상적으로 표기되고 상세보기 버튼은 비어있다.', async () => {
    const { queryByTestId } = render(<OrderCard order={order} />)

    expect(screen.getByText(order.orderDetails[0].name)).toBeInTheDocument()
    expect(queryByTestId(/username/i)).toBeNull()
  })

  it('enableShowDetail 속성을 넣으면 상세보기 버튼이 추가된다.', async () => {
    const { queryByTestId } = render(<OrderCard order={order} enableShowDetail />)

    expect(screen.getByText(order.orderDetails[0].name)).toBeInTheDocument()
    expect(screen.queryByTestId(/상세보기-버튼/i)).toBeTruthy()
  })
})
