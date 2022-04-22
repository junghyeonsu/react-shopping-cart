import { Product } from "../../types/dto";
import productReducer from "./reducer";
import { ProductAction } from "./action";
import { ProductActionType } from "./actionType";

const products: Product[] = [
  {
    id: 1,
    name: "냉면용기(대)",
    price: 83700,
    imageUrl: "https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg",
  },
  {
    id: 2,
    name: "생새우살 (71/90) 500g 4개",
    price: 29000,
    imageUrl:
      "https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg",
  },
];

test("initial state를 반환한다.", () => {
  const state = productReducer(undefined, {} as any);

  expect(state).toEqual({
    loading: false,
    products: null,
    message: null,
  });
});

test("상품 목록 불러오기 요청 시 로딩의 상태는 true이다", () => {
  const state = productReducer(undefined, {
    type: ProductActionType.GET_PRODUCTS_REQUEST,
  });

  expect(state.loading).toEqual(true);
});

test("상품 목록 요청 성공 시 product에 배열이 생성된다.", () => {
  const action: ProductAction = {
    type: ProductActionType.GET_PRODUCTS_SUCCESS,
    payload: products,
  };

  const state = productReducer(undefined, action);

  expect(state).toEqual({
    loading: false,
    products: products,
    message: null,
  });
});

test("상품 목록 요청 실패 시 에러메세지를 호출한다.", () => {
  const action: ProductAction = {
    type: ProductActionType.GET_PRODUCTS_ERROR,
    payload: null,
  };

  const state = productReducer(undefined, action);

  expect(state).toEqual({
    loading: false,
    products: null,
    message: "상품을 불러오는데 실패하였습니다.",
  });
});
