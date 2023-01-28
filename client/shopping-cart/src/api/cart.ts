import { useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher, mutator } from "./common";

const CART_KEY = "cart";

export const usePostCarts = mutator(({ product }: { product: ProductType }) =>
  fetcher({
    path: `carts`,
    method: "POST",
    body: {
      product,
    },
  }),
);

export const useGetCarts = () =>
  useQuery<ProductType[]>(CART_KEY, () =>
    fetcher({
      path: "carts",
      method: "GET",
    }),
  );

export const useDeleteCarts = mutator(({ id }: { id: number }) =>
  fetcher({
    path: `carts/${id}`,
    method: "DELETE",
  }),
);
