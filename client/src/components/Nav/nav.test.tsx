import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Nav from './index';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
}));

describe('Nav.tsx', () => {
  beforeEach(() => {
    render(<Nav />);
  });

  it('render 성공', () => {
    const utils = render(<Nav />);
    expect(utils.container).toMatchSnapshot();
  });

  it('제목, 장바구니, 주문목록 텍스트 확인', () => {
    screen.getAllByText('CLEAN CODE SHOP');
    screen.getAllByText('장바구니');
    screen.getAllByText('주문목록');
  });

  it('제목을 누르면 /로 라우팅', () => {
    fireEvent.click(screen.getByText('CLEAN CODE SHOP'));
    expect(mockNavigate).toBeCalled();
  });
});


