import { rest } from 'msw';
import { Order, OrderDetail } from '../../types/dto';

export const orderHandler = [
  rest.get<Order>('http://localhost:3003/orders/:id', (_, res, ctx) =>
    res(ctx.json(order))
  ),
  rest.get<Order[]>('http://localhost:3003/orders', (_, res, ctx) =>
    res(ctx.json(orders))
  ),
  rest.post<OrderDetail[]>('http://localhost:3003/orders', (req, res, ctx) => {
    const orderDetails = Object.values(req.body)[0] as unknown as OrderDetail[];

    orders.push({ id: orders.length + 1, orderDetails });

    return orderDetails
      ? res(ctx.status(201), ctx.json('Created'))
      : res(ctx.status(401));
  }),
];

export const orders: Order[] = [
  {
    id: 1,
    orderDetails: [
      {
        id: 1,
        name: '[리뉴얼]젓가락(종이)-정성을 담아',
        price: 21800,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/5297837f-5ecd-4945-be2f-4a75854cd06e.jpg',
        quantity: 5,
      },
      {
        id: 2,
        name: '젓가락(종이)-웬만해선 이 맛을 막을 수 없다',
        price: 21800,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/1b6e926b-52a3-4a92-8db5-fddaccdb2583.jpg',
        quantity: 3,
      },
    ],
  },
  {
    id: 1646148992051,
    orderDetails: [
      {
        id: 1,
        name: '냉면용기(대)',
        price: 83700,
        imageUrl: 'https://cdn-mart.baemin.com/goods/2/1556008840639m0.jpg',
        quantity: 3,
      },
      {
        id: 2,
        name: '생새우살 (71/90) 500g 4개',
        price: 29000,
        imageUrl:
          'https://cdn-mart.baemin.com/sellergoods/main/6b95c66a-c13d-4ccd-9df5-b1af1428a225.jpg',
        quantity: 5,
      },
    ],
  },
];

export const order: Order = {
  id: 1646289557000,
  orderDetails: [
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
  ],
};
