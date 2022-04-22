import { rest } from 'msw';
import { Cart, Product } from '../../types/dto';

export const cartHandler = [
  rest.get('http://localhost:3003/carts', (_, res, ctx) =>
    res(ctx.json(cartProducts))
  ),
  rest.delete('http://localhost:3003/carts/:id', (req, res, ctx) => {
    const { id } = req.params;

    const hasProductId = cartProducts.some(
      (product) => product.id === Number(id)
    );

    return hasProductId ? res(ctx.status(200)) : res(ctx.status(400));
  }),
  rest.post<Product>('http://localhost:3003/carts', (req, res, ctx) => {
    const product = Object.values(req.body);

    cartProducts.push({ id: cartProducts.length + 1, product: product[0] });

    return product
      ? res(ctx.status(201), ctx.json('Created'))
      : res(ctx.status(401));
  }),
];

export const cartProducts: Cart[] = [
  {
    id: 1,
    product: {
      id: 12,
      name: '[리뉴얼]젓가락(종이)-정성을 담아',
      price: 21800,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
    },
  },
  {
    id: 2,
    product: {
      id: 11,
      name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
      price: 21800,
      imageUrl:
        'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
    },
  },
];
