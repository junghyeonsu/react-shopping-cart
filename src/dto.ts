type Timestamp = {
  seconds: number
  nanoseconds: number
}

export interface Product {
  id: string
  price: number
  name: string
  imageUrl: string
  createdAt: Timestamp
}

export type ProductRequest = Omit<Product, 'id' | 'createdAt'>

export interface PostCartRequest {
  productId: string
}

export interface OrderDetail {
  productId: string
  product: Product
  quantity: number
  updatedAt: Timestamp
}

export interface Order {
  id: string
  orderDetails: OrderDetail[]
}

export interface GetOrderResponse extends Order {}

export interface PostOrderResponse {
  orderDetails: OrderDetail[]
}
export interface GetCartResponse extends OrderDetail {}
