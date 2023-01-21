import axios from "axios";

import type { Product } from "../types";

export const getProduct = async (id: string) => {
  const response = await axios.get<Product>(`/products/${id}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get<Product[]>("/products");
  return response.data;
};

export const postProducts = async (product: Product) => {
  const response = await axios.post("/products", product);
  return response.data;
};
