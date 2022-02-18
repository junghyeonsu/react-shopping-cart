import { Product } from '../../@types/products'
import { RootState } from '../root'

const productsSelector = (state: RootState) => state.products.value.getProducts()

const makeProductSelectorById = (id: Product['id']) => (state: RootState) => state.products.value.getProductsById(id)

export { productsSelector, makeProductSelectorById }
