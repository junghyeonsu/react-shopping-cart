import type { MutationFunction, UseMutationOptions } from "react-query";
import { useMutation, useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher } from "./client";

const CART_KEY = "cart";

const mutator =
  <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    mutationFn: MutationFunction<TData, TVariables>,
  ) =>
  (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
    useMutation<TData, TError, TVariables, TContext>(mutationFn, options);

export const usePostCarts = mutator(({ product }: { product: ProductType }) =>
  fetcher({
    path: `carts`,
    method: "POST",
    body: {
      product,
    },
  }),
);

export const useGetCarts = () => {
  const { data, isLoading, isError, isSuccess } = useQuery<ProductType[]>(CART_KEY, () =>
    fetcher({
      path: "carts",
      method: "GET",
    }),
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useDeleteCarts = mutator(({ id }: { id: number }) =>
  fetcher({
    path: `carts/${id}`,
    method: "DELETE",
  }),
);
