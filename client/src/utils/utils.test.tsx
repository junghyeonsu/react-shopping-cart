import { formattedPrice, getCartTotalPrice } from './index';
import { CartItemInfoI } from '../models/cart';

it('결제 예상 금액 책정', () => {
  const cartItems: CartItemInfoI[] = [
    {
      id: 1,
      name: '[리뉴얼]젓가락(종이)-정성을 담아',
      price: 21800,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
      quantity: 1,
      isChecked: true,
    },
    {
      id: 2,
      name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
      price: 21800,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
      quantity: 1,
      isChecked: true,
    },
  ];

  expect(getCartTotalPrice(cartItems)).toBe(43600);
});

it('금액 콤마로 나누기', () => {
  expect(formattedPrice(50000)).toBe('50,000');
});
