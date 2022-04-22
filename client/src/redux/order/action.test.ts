import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { getOrders, postOrderDetails } from './actionCreator';
import { OrderActionType } from './actionType';
import { OrderDetail } from '../../types/dto';
import { orders } from '../../mocks/handlers/order';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore({});

beforeEach(() => (store = mockStore({})));

test('주문 목록 불러오기 성공 시 주문 목록을 불러온다.', async () => {
  await store.dispatch(getOrders() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: OrderActionType.GET_ORDERS_SUCCESS,
    payload: orders,
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('주문 목록 불러오기 실패 시 에러를 호출한다.', async () => {
  server.use(
    rest.get('http://localhost:3003/orders', (_, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal Server Error' })
      );
    })
  );

  await store.dispatch(getOrders() as any);
  const actions = store.getActions();

  const expectedAction = {
    type: OrderActionType.GET_ORDERS_ERROR,
    payload: 'Request failed with status code 500',
  };

  expect(actions[1]).toEqual(expectedAction);
});

test('주문 목록에 주문 추가 성공시 action type은 success이다.', async () => {
  const orderDetails: OrderDetail[] = [
    {
      id: 1,
      name: '냉면용기(대)',
      price: 83700,
      imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
      quantity: 5,
    },
    {
      id: 2,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
      name: '생새우살 (71/90) 500g 4개',
      price: 29000,
      quantity: 3,
    },
  ];

  await store.dispatch(postOrderDetails(orderDetails, () => {}) as any);

  const actions = store.getActions();

  const expectedAction = {
    type: OrderActionType.POST_ORDER_DETAILS_SUCCESS,
  };

  expect(actions[1]).toEqual(expectedAction);
});
