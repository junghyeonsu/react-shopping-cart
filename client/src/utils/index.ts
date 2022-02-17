import { CartItemI } from '@/models/cart';

export const formattedPrice = (price: number, locale = 'ko-KR') => {
  return price.toLocaleString(locale);
};

export const getCartTotalPrice = (items: CartItemI[] = []) => {
  return items.reduce((acc, curr) => acc + curr.product.price, 0);
};
