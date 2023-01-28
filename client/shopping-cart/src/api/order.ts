import { useQuery } from "react-query";

import type { OrderDetailType, ProductType } from "../types";
import { fetcher, mutator } from "./common";

const ORDER_KEY = "orders";

export const usePostOrders = mutator(({ products }: { products: ProductType[] }) =>
  fetcher({
    path: `orders`,
    method: "POST",
    body: {
      orderDetails: products,
    },
  }),
);

export const useGetOrders = () =>
  useQuery<{ id: number; orderDetails: OrderDetailType[] }[]>(ORDER_KEY, () =>
    fetcher({
      path: "orders",
      method: "GET",
    }),
  );
