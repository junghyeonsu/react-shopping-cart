export type Timestamp = {
  seconds: number
  nanoseconds: number
}

export type Product = {
  id: string
  price: number
  name: string
  imageUrl: string
  createdAt: Timestamp
}

export type ProductRequest = Omit<Product, 'id' | 'createdAt'>

export type PostCartRequest = {
  productId: string
}

export type OrderDetail = {
  id: string
  productId: string
  product: Product
  quantity: number
  updatedAt: Timestamp
  serverMessage?: string
}

export type Order = {
  id: string
  orderDetails: OrderDetail[]
  createdAt: Timestamp
}

export type ValuePick<T, U extends keyof T> = T[U]
