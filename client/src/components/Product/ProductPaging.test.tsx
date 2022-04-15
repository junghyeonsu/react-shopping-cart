import { describe, expect, it } from 'vitest'
import { render, screen } from '../../core/testing/util'
import ProductPaging from './ProductPaging'
import { useState } from 'react'
import colors from '../../constants/colors'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'

const CURRENT_PAGE = 'current-page'
const PagingWrapper = ({ initialPage, maxPage }: { maxPage: number; initialPage: number }) => {
  const [page, setPage] = useState(() => initialPage)

  return <ProductPaging currentPage={page} maxPage={maxPage} setPage={setPage} />
}

describe('컴포넌트 렌더링 테스트', () => {
  it('설정한 최대 페이지에 따라 버튼이 렌더링된다.', () => {
    render(<PagingWrapper initialPage={1} maxPage={3} />)

    expect(screen.getByText(1)).toBeInTheDocument()
    expect(screen.getByText(2)).toBeInTheDocument()
    expect(screen.getByText(3)).toBeInTheDocument()
    const fourthButton = screen.queryByText('4')

    expect(fourthButton).not.toBeInTheDocument()
  })

  it('렌더링 시 첫번째 페이지가 선택된 상태이다.', () => {
    render(<PagingWrapper initialPage={1} maxPage={3} />)

    const currentButton = screen.getByTestId(CURRENT_PAGE)

    expect(currentButton).toHaveStyle(`color: ${colors.tomato400}`)
    expect(currentButton).toHaveStyle(`border: 1px solid ${colors.tomato400}`)
    expect(currentButton).not.toHaveStyle(`color: ${colors.black300}`)
  })

  it('렌더링 시 최대 페이지가 10개가 넘어가면 11번 페이지로 바로 이동할 수 있는 > 버튼이 추가된다.', () => {
    render(<PagingWrapper initialPage={1} maxPage={11} />)

    expect(screen.getByText('>')).toBeInTheDocument()
  })
})

describe('컴포넌트 이벤트 테스트', () => {
  it('버튼을 클릭 시 페이지가 변경된다.', async () => {
    render(<PagingWrapper initialPage={1} maxPage={6} />)

    const firstButton = screen.getByText(1)
    const fifthButton = screen.getByText(5)

    // 첫번째 버튼이 활성화 된 상태이다.
    expect(firstButton).toHaveStyle(`color: ${colors.tomato400}`)
    expect(firstButton).toHaveStyle(`border: 1px solid ${colors.tomato400}`)
    expect(fifthButton).toHaveStyle(`color: ${colors.black300}`)
    expect(fifthButton).toHaveStyle(`border: 1px solid ${colors.black100}`)

    // 5번 페이지를 선택 시
    userEvent.click(fifthButton)

    await waitFor(() => expect(firstButton).not.toHaveStyle(`color: ${colors.tomato400}`), { timeout: 4000 })

    // 1번 버튼과 5번의 스타일이 서로 교체된다.
    expect(firstButton).toHaveStyle(`color: ${colors.black300}`)
    expect(firstButton).toHaveStyle(`border: 1px solid ${colors.black100}`)
    expect(fifthButton).toHaveStyle(`color: ${colors.tomato400}`)
    expect(fifthButton).toHaveStyle(`border: 1px solid ${colors.tomato400}`)
  })
})
