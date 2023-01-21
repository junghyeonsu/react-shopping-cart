import { useQuery } from "react-query";

import type { ProductType } from "../types";
import { fetcher } from "./client";

export const useProduct = (id: string) => {
  const { data, isLoading, error } = useQuery<ProductType>("product", () =>
    fetcher({
      path: `productse/${id}`,
      method: "GET",
    }),
  );

  return {
    data,
    isLoading,
    error,
  };
};

export const useProducts = () => {
  const { data, isLoading, error } = useQuery<ProductType[]>("products", () =>
    fetcher({
      path: "products",
      method: "GET",
    }),
  );

  return {
    data,
    isLoading,
    error,
  };
};
