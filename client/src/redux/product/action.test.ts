import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { server } from '../../mocks/server';
import { rest } from 'msw';
import { getProducts } from './actionCreator';
import { ProductActionType } from './actionType';
import { products } from '../../mocks/handlers/product';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore({});

beforeEach(() => (store = mockStore({})));

test('상품 목록 불러오기 성공 시 상품 목록을 불러온다.', async () => {
  await store.dispatch(getProducts() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: ProductActionType.GET_PRODUCTS_SUCCESS,
    payload: products,
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('상품 목록 불러오기 실패 시 에러를 호출한다.', async () => {
  server.use(
    rest.get('http://localhost:3003/products', (_, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error' })
      );
    })
  );

  await store.dispatch(getProducts() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: ProductActionType.GET_PRODUCTS_ERROR,
    payload: 'Request failed with status code 500',
  };

  expect(actions[1]).toEqual(expectedAction);
});
