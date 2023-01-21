interface ProductType {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

interface OrderDetailType {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  quantity: number;
}

interface CartType {
  id: number;
  products: ProductType[];
}

export type { CartType, OrderDetailType, ProductType };
