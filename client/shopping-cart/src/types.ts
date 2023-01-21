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

export type { OrderDetail, Product };
