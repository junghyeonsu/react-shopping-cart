import type { ProductType } from "../types";
import { fetcher, mutator } from "./common";

export const usePostOrders = mutator(({ products }: { products: ProductType[] }) =>
  fetcher({
    path: `orders`,
    method: "POST",
    body: {
      orderDetails: products,
    },
  }),
);
