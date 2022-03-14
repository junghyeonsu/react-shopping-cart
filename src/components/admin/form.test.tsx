import { test, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import AdminForm from './form'

test('render form', () => {
  const handleSubmit = vi.fn((res: any) => {
    return 'test'
  })
  const renderForm = () => render(<AdminForm handleSubmit={handleSubmit} />)
  const { getByTestId } = renderForm()

  fireEvent.change(getByTestId('admin-form-name'), {
    target: { value: 'test' },
  })
  expect(getByTestId('admin-form-name')).toHaveProperty('value', 'test')

  fireEvent.change(getByTestId('admin-form-image'), {
    target: { value: 'http://abc.com' },
  })
  expect(getByTestId('admin-form-image')).toHaveProperty(
    'value',
    'http://abc.com',
  )

  fireEvent.change(getByTestId('admin-form-price'), {
    target: { value: 3000 },
  })
  expect(getByTestId('admin-form-price')).toHaveProperty('value', '3000')

  fireEvent.click(getByTestId('admin-form-submit'))
  expect(handleSubmit).toHaveBeenCalled()
  expect(handleSubmit).toHaveReturnedWith('test')
})
