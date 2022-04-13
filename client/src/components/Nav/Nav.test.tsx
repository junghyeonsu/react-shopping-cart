import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from './Nav'

describe('Navigation', () => {
  it('should navigate to "MainPage" when Navigation Title is clicked', async () => {
    const { userEvent } = renderWithMemoryRouter(<Nav>children</Nav>)
    await userEvent.click(screen.getByText('CLEAN CODE SHOP'))
    expect(screen.getByText('CLEAN CODE SHOP')).toBeInTheDocument()
  })
  it('should navigate to "CartPage" when Cart Button is clicked', async () => {
    const { userEvent } = renderWithMemoryRouter(<Nav>children</Nav>)
    await userEvent.click(screen.getByText('장바구니'))
    expect(screen.getByText('장바구니')).toBeInTheDocument()
  })
  it('should navigate to "ProductOrderListPage" when OrderList Button is clicked', async () => {
    const { userEvent } = renderWithMemoryRouter(<Nav>children</Nav>)
    await userEvent.click(screen.getByText('주문목록'))
    expect(screen.getByText('주문목록')).toBeInTheDocument()
  })
})

const renderWithMemoryRouter = (ui: React.ReactElement) => {
  return {
    userEvent,
    ...render(ui, { wrapper: MemoryRouter }),
  }
}
