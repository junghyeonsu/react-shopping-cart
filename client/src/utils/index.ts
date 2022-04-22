import { CartItemInfoI } from '@/models/cart';

export const formattedPrice = (price: number, locale = 'ko-KR') => {
  return price.toLocaleString(locale);
};

export const getCartTotalPrice = (items: CartItemInfoI[] = []) => {
  return items.reduce((acc, curr) => {
    if (curr.isChecked) {
      return acc + curr.price * curr.quantity;
    }
    return acc;
  }, 0);
};
