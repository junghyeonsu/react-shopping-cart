import { useQuery } from "react-query";

import { fetcher } from "./client";

export const useProduct = <T>(id: string) => {
  const { data, isLoading, error } = useQuery<T>("product", () =>
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

export const useProducts = <T>() => {
  const { data, isLoading, error } = useQuery<T>("products", () =>
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
