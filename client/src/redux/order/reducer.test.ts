import { Order } from "../../types/dto";
import { OrderAction } from "./action";
import { OrderActionType } from "./actionType";
import orderReducer, { initialState } from "./reducer";

const orders: Order[] = [
  {
    "id": 1,
    "orderDetails": [
      {
        "id": 1,
        "name": "[리뉴얼]젓가락(종이)-정성을 담아",
        "price": 21800,
        "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg",
        "quantity": 5
      },
      {
        "id": 2,
        "name": "젓가락(종이)-웬만해선 이 맛을 막을 수 없다",
        "price": 21800,
        "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg",
        "quantity": 3
      }
    ]
  },
  {
    "id": 1646148992051,
    "orderDetails": [
      {
        "id": 1,
        "name": "냉면용기(대)",
        "price": 83700,
        "imageUrl": "https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg",
        "quantity": 3
      },
      {
        "id": 2,
        "name": "생새우살 (71/90) 500g 4개",
        "price": 29000,
        "imageUrl": "https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg",
        "quantity": 5
      }
    ]
  },
]

test("initial state를 반환한다.", () => {
  const state = orderReducer(undefined, {} as any);

  expect(state).toEqual({
    loading: false,
    orders: null,
    paymentProducts: null,
    message: null,
  });
});

test("주문 목록 불러오기 요청 시 로딩의 상태는 true이다", () => {
  const state = orderReducer(initialState, {
    type: OrderActionType.GET_ORDERS_REQUEST,
  });

  expect(state.loading).toEqual(true);
});

test("주문 목록 요청 성공 시 orders에 주문목록이 생성된다.", () => {
  const action: OrderAction = {
    type: OrderActionType.GET_ORDERS_SUCCESS,
    payload: orders,
  };

  const state = orderReducer(initialState, action);

  expect(state).toEqual({
    loading: false,
    orders: orders,
    paymentProducts: null,
    message: null,
  });
});

test("주문 목록 요청 실패 시 에러메세지를 호출한다.", () => {
  const action: OrderAction = {
    type: OrderActionType.GET_ORDERS_ERROR,
    payload: null,
  };

  const state = orderReducer(initialState, action);

  expect(state).toEqual({
    loading: false,
    orders: null,
    paymentProducts: null,
    message: "주문목록을 불러오는데 실패하였습니다.",
  });
});
