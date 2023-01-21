interface Product {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

interface OrderDetail {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

interface Cart {
  id: number;
  products: Product[];
}

export type { Cart, OrderDetail, Product };
