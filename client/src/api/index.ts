import axios from "axios";
import { Cart, Order, OrderDetail, Product } from "../types/dto";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

/**
 * products
 */

export const requestGetProducts = async () => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

/**
 * carts
 */

export const requestGetCartProducts = async () => {
  const { data } = await api.get<Cart[]>("/carts");
  return data;
};

export const requestDeleteCartProduct = async (id: number) => {
  return await api.delete(`/carts/${id}`);
};

export const requestPostCartProduct = async (product: Product) => {
  return await api.post("/carts", {
    product,
  });
};

/**
 * orders
 */

export const requestGetOrder = async (id: number) => {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
};

export const requestGetOrders = async () => {
  const { data } = await api.get<Order[]>("/orders");
  return data;
};

export const requestPostOrderDetails = async (orderDetails: OrderDetail[]) => {
  return await api.post("/orders", { orderDetails });
};
