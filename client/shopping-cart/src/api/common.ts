/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MutationFunction, UseMutationOptions } from "react-query";
import { QueryClient, useMutation } from "react-query";

interface FetchProps {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  params?: Record<string, any>;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 0,
    },
  },
});

export const fetcher = async ({ path, method, params, body }: FetchProps) => {
  const baseUrl = "http://localhost:3003";
  let requestUrl = `${baseUrl}/${path}`;

  const option: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    if (params) {
      const searchParams = new URLSearchParams(params);
      requestUrl += `?${searchParams.toString()}`;
    }

    if (body) {
      option.body = JSON.stringify(body);
    }

    const response = await fetch(requestUrl, option);
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export const mutator =
  <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    mutationFn: MutationFunction<TData, TVariables>,
  ) =>
  (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
    useMutation<TData, TError, TVariables, TContext>(mutationFn, options);
