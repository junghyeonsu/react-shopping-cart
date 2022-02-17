export interface ProductI {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

export interface ProductRequestI {
  product: Omit<ProductI, 'id'>;
}
