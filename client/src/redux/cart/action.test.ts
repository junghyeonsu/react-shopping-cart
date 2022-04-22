import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { server } from '../../mocks/server';
import { rest } from 'msw';
import {
  deleteCartProduct,
  getCartProducts,
  postCartProduct,
} from './actionCreator';
import { CartActionType } from './actionType';
import { Product } from '../../types/dto';
import { cartProducts } from '../../mocks/handlers/cart';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore({});

beforeEach(() => (store = mockStore({})));

test('장바구니 목록 불러오기 성공 시 상품 목록을 불러온다.', async () => {
  await store.dispatch(getCartProducts() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: CartActionType.GET_CART_PRODUCTS_SUCCESS,
    payload: cartProducts,
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('장바구니 목록 불러오기 실패 시 에러를 호출한다.', async () => {
  server.use(
    rest.get('http://localhost:3003/carts', (_, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error' })
      );
    })
  );

  await store.dispatch(getCartProducts() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: CartActionType.GET_CART_PRODUCTS_ERROR,
    payload: 'Request failed with status code 500',
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('장바구니 목록에 상품 추가 성공시 action type은 success이다.', async () => {
  const product: Product = {
    id: 1,
    name: '냉면용기(대)',
    price: 83700,
    imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
  };
  await store.dispatch(postCartProduct(product, () => {}) as any);

  const actions = store.getActions();

  const expectedAction = {
    type: CartActionType.POST_CART_PRODUCTS_SUCCESS,
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('장바구니 목록에 특정 상품 삭제시 action type은 success이다.', async () => {
  await store.dispatch(deleteCartProduct(1) as any);

  const actions = store.getActions();

  const expectedAction = {
    type: CartActionType.DELETE_CART_PRODUCTS_SUCCESS,
  };

  expect(actions[1]).toEqual(expectedAction);
});
