/*
  /products
*/

export interface Product {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
}

export interface GetProdutResponse extends Product {}

export interface ProductProps {
  product: Product;
}

export interface PostProductRequest {
  product: Omit<Product, "id">;
}

/*
  /carts
*/

export interface Cart {
  id: number;
  product: Product;
  quantity: number;
  checked: boolean;
}

export interface GetCartResponse extends Cart {}

export interface CartProps {
  cart: Cart;
}

export interface PostCartRequest {
  product: Product;
}

/*
  /orders
*/

export interface OrderDetail extends Product {
  quantity: number;
}

export interface OrderDetailHook extends OrderDetail {}

export interface OrderDetailProps {
  orderDetail: OrderDetail;
}

export interface Order {
  id: number;
  orderDetails: OrderDetail[];
}

export interface OrderHook extends Order {}

export interface GetOrderResponse extends Order {
  index: number;
}

export interface OrderProps {
  order: Order;
  index: number;
}

export interface PostOrderResponse {
  orderDetails: OrderDetail[];
}
