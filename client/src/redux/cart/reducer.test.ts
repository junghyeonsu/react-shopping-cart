import { Cart } from "../../types/dto";
import { CartAction } from "./action";
import cartReducer from "./reducer";
import { CartActionType } from "./actionType";

const cartProducts: Cart[] = [
  {
    id: 1,
    product: {
      id: 12,
      name: "[리뉴얼]젓가락(종이)-정성을 담아",
      price: 21800,
      imageUrl:
        "https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg",
    },
  },
  {
    id: 2,
    product: {
      id: 11,
      name: "젓가락(종이)-웬만해선 이 맛을 막을 수 없다",
      price: 21800,
      imageUrl:
        "https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg",
    },
  },
];

test("initial state를 반환한다.", () => {
  const state = cartReducer(undefined, {} as any);

  expect(state).toEqual({
    loading: false,
    products: null,
    message: null,
  });
});

test("장바구니 목록 불러오기 요청 시 로딩의 상태는 true이다", () => {
  const state = cartReducer(undefined, {
    type: CartActionType.GET_CART_PRODUCTS_REQUEST,
  });

  expect(state.loading).toEqual(true);
});

test("장바구니 목록 요청 성공 시 product에 상품목록이 생성된다.", () => {
  const action: CartAction = {
    type: CartActionType.GET_CART_PRODUCTS_SUCCESS,
    payload: cartProducts,
  };

  const state = cartReducer(undefined, action);

  expect(state).toEqual({
    loading: false,
    products: cartProducts,
    message: null,
  });
});

test("장바구니 목록 요청 실패 시 에러메세지를 호출한다.", () => {
  const action: CartAction = {
    type: CartActionType.GET_CART_PRODUCTS_ERROR,
    payload: null,
  };

  const state = cartReducer(undefined, action);

  expect(state).toEqual({
    loading: false,
    products: null,
    message: "상품을 불러오는데 실패하였습니다.",
  });
});
