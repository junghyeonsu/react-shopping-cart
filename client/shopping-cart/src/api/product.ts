import { useInfiniteQuery, useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher } from "./common";

const PRODUCT_SIZE_AT_ONCE = 4;

export const useProduct = (id: string) => {
  const { data, isLoading, error, isError } = useQuery<ProductType>("product", () =>
    fetcher({
      path: `products/${id}`,
      method: "GET",
    }),
  );

  return {
    data,
    isLoading,
    error,
    isError,
  };
};

export const useProducts = () => {
  const { data, isLoading, error, hasNextPage, isError, fetchNextPage } = useInfiniteQuery<
    ProductType[]
  >(
    "products",
    ({ pageParam = 1 }) =>
      fetcher({
        path: "products",
        method: "GET",
        params: {
          page: pageParam,
        },
      }),

    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < PRODUCT_SIZE_AT_ONCE) {
          return undefined;
        }

        return pages.length + 1;
      },
    },
  );

  return {
    data,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
  };
};
