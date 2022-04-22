import { fireEvent, render, screen } from '@testing-library/react';
import ErrorModal from './ErrorModal';

jest.mock('react-redux', () => ({
  useSelector: () => {},
}));

jest.mock('@reduxjs/toolkit', () => ({
  useAppDispatch: () => {},
  createAsyncThunk: () => {},
  createEntityAdapter: () => {},
  getInitialState: jest.fn(() => ({})),
}));

describe('ErrorModal.tsx', () => {
  beforeAll(() => {
    render(<ErrorModal />);
  });
});
