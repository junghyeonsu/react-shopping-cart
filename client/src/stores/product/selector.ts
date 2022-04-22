import { RootState } from '..'

export const isProductsLoadingSelector = (state: RootState) => state.product.loading
export const productsSelector = (state: RootState) => state.product.list
