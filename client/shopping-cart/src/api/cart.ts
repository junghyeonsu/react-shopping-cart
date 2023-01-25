import { useMutation, useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher } from "./client";

const CART_KEY = "cart";

export const usePostCarts = ({ product }: { product: ProductType }) => {
  const { isLoading, isError, mutate } = useMutation<ProductType>(CART_KEY, () =>
    fetcher({
      path: `carts`,
      method: "POST",
      body: {
        product,
      },
    }),
  );

  return {
    mutate,
    isLoading,
    isError,
  };
};

export const useGetCarts = () => {
  const { data, isLoading, isError } = useQuery<ProductType[]>(CART_KEY, () =>
    fetcher({
      path: "carts",
      method: "GET",
    }),
  );

  return {
    data,
    isLoading,
    isError,
  };
};
