import React from 'react';
import { render } from '@testing-library/react';
// import { render } from '@/utils/test-utils';
import Detail from './index';
import { ProductI } from '@/models/product';

jest.mock('react-redux', () => ({
  useSelector: () => {},
}));
jest.mock('@reduxjs/toolkit', () => ({
  useAppDispatch: () => {},
  createAsyncThunk: () => {},
  createEntityAdapter: () => {},
  getInitialState: jest.fn(() => ({}))
}))

const product: ProductI = {
  id: 1,
  name: '냉면용기(대)',
  price: 83700,
  imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
};

describe('Detail.tsx', () => {
  it.skip('render', () => {
    render(<Detail />);
  });
});
