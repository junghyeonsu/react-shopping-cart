import { useInfiniteQuery, useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher } from "./common";

const PRODUCT_SIZE_AT_ONCE = 4;

export const useProduct = (id: string) =>
  useQuery<ProductType>("product", () =>
    fetcher({
      path: `products/${id}`,
      method: "GET",
    }),
  );

export const useProducts = () =>
  useInfiniteQuery<ProductType[]>(
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
