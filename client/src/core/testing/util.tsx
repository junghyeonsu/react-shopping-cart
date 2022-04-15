import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { AnyAction, configureStore, EnhancedStore, Middleware, Reducer, Store } from '@reduxjs/toolkit'
import { productApi } from '../redux/service/product'
import { Provider } from 'react-redux'
import { act } from '@testing-library/react-hooks'
import { setupListeners } from '@reduxjs/toolkit/query'

function Wrapper({ children }: { children: ReactElement }) {
  const store = configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
    },
  })

  return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: ReactElement, options: object = {}) =>
  render(ui, {
    wrapper: ({ children }) => Wrapper({ children }),
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export const DEFAULT_DELAY_MS = 150

export async function waitMs(time = DEFAULT_DELAY_MS) {
  const now = Date.now()
  while (Date.now() < now + time) {
    await new Promise((res) => process.nextTick(res))
  }
}

export function waitForFakeTimer(time = DEFAULT_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const hookWaitFor = async (cb: () => void, time = 2000) => {
  const startedAt = Date.now()

  while (true) {
    try {
      cb()
      return true
    } catch (e) {
      if (Date.now() > startedAt + time) {
        throw e
      }
      await act(() => waitMs(2))
    }
  }
}

export function withProvider(store: Store<any>) {
  return function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>
  }
}

export function setupApiStore<
  A extends {
    reducerPath: 'api'
    reducer: Reducer<any, any>
    middleware: Middleware
    util: { resetApiState(): any }
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>,
>(api: A, extraReducers?: R, withoutListeners?: boolean) {
  const getStore = () =>
    configureStore({
      reducer: { api: api.reducer, ...extraReducers },
      middleware: (gdm) => gdm({ serializableCheck: false, immutableCheck: false }).concat(api.middleware),
    })

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A['reducer']>
    } & {
      [K in keyof R]: ReturnType<R[K]>
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M> ? M : never
  >

  const initialStore = getStore() as StoreType
  const refObj = {
    api,
    store: initialStore,
    wrapper: withProvider(initialStore),
  }
  let cleanupListeners: () => void

  beforeEach(() => {
    const store = getStore() as StoreType
    refObj.store = store
    refObj.wrapper = withProvider(store)
    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch)
    }
  })
  afterEach(() => {
    if (!withoutListeners) {
      cleanupListeners()
    }
    refObj.store.dispatch(api.util.resetApiState())
  })

  return refObj
}

export { customRender as render }
