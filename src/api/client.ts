import { QueryClient } from 'react-query'

export type METHOD = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export const enum QueryKeys {
  products = 'products',
  product = 'product',
  orders = 'orders',
  order = 'order',
  cart = 'cart',
}

export const SERVER_URL = import.meta.env.VITE_SERVER_URL as string
const DefaultFetchOption = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': SERVER_URL,
  },
}

type FetcherArguments = {
  method: METHOD
  path: string
  body?: { [key: string]: any }
  params?: { [key: string]: any }
  signal?: AbortSignal
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const fetcher = async ({
  method,
  path,
  body,
  params,
  signal,
}: FetcherArguments) => {
  try {
    let url = `${SERVER_URL}${path}`
    const fetchOption: RequestInit = {
      method,
      signal,
      ...DefaultFetchOption,
    }
    if (params) {
      const searchParams = new URLSearchParams(params)
      url += '?' + searchParams.toString()
    }
    if (body) fetchOption.body = JSON.stringify(body)
    const res = await fetch(url, fetchOption)
    const json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}
