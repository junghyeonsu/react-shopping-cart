const PRODUCTS = {
  response: [
    {
      id: 1,
      price: 10000,
      name: '치킨',
      imageUrl: 'https://fakeimg.pl/300/',
    },
    {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://fakeimg.pl/300/',
    },
    {
      id: 3,
      price: 30000,
      name: '족발',
      imageUrl: 'https://fakeimg.pl/300/',
    },
    {
      id: 4,
      price: 40000,
      name: '보쌈',
      imageUrl: 'https://fakeimg.pl/300/',
    },
    {
      id: 5,
      price: 50000,
      name: '닭목살',
      imageUrl: 'https://fakeimg.pl/300/',
    },
  ],
};

export type ProductType = {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

export type ProductsType = {
  response: ProductType[]
}

export default PRODUCTS;
