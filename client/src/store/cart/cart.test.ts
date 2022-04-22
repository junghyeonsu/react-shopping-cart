import axios from 'axios';
import { store } from '@/store';
import { CartItemI } from '@/models/cart';
import { fetchCartList } from '@/store/cart/cartSlice';

describe('[Store] Cart', () => {
  it('should return initialState', () => {
    const state = store.getState().cart;
    expect(state).toEqual({
      entities: {},
      ids: [],
      hasError: false,
      isLoading: false,
    });
  });

  it.skip('get cart list', async () => {
    const cartItems: CartItemI[] = [
      {
        id: 1,
        product: {
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
          name: '[리뉴얼]젓가락(종이)-정성을 담아',
          price: 21800,
        },
      },
      {
        id: 1644736517274,
        product: {
          imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
          name: '냉면용기(대)',
          price: 83700,
        },
      },
      {
        id: 1644749033537,
        product: {
          imageUrl:
            'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
          name: '생새우살 (71/90) 500g 4개',
          price: 29000,
        },
      },
    ];

    const getSpy = jest.spyOn(axios, 'get').mockResolvedValue(cartItems);
    axios.get = jest.fn().mockResolvedValue(cartItems);
    const result = await store.dispatch(fetchCartList());
    expect(result.payload).toEqual(cartItems);
  });

  // it('fetch getCartList', async () => {
  //   let thenFn = jest.fn();
  //   let catchFn = jest.fn();
  //
  //   getCartList().then(thenFn).catch(catchFn);
  //
  //   mockAxios.mockResponseFor({ url: '/carts' }, { data: cartItems });
  //
  //   // const result = await getCartList();
  //   // expect(result.data).toEqual(cartItems);
  //
  //   expect(thenFn).toHaveBeenCalled();
  //   expect(catchFn).not.toHaveBeenCalled();
  // });
});
