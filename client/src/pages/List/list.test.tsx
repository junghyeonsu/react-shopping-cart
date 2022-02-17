import React from 'react';
import { fireEvent, render, screen } from '@/utils/test-utils';
import { List } from '@/pages';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => {},
  }
));
jest.mock('@reduxjs/toolkit', () => ({
  useAppDispatch: `jest.fn(() => ({}))`,
  createAsyncThunk: jest.fn(() => ({})),
  createEntityAdapter: jest.fn(() => ({})),
  getInitialState: jest.fn(() => ({}))
}))

describe('List.tsx', () => {
  beforeEach(() => {
    render(<List />)
  })

  it.skip('상품을 클릭하면 모달이 뜸',  () => {
    fireEvent.click(screen.getByTestId('product-image'))
    expect(mockNavigate).toBeCalled();
  })
})
