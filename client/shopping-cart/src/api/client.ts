import { QueryClient } from "react-query";

interface FetchProps {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
      const searchParams = new URLSearchParams(params.toString());
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
