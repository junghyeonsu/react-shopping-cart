import { Product } from '../@types/products'

interface ProductMap {
  [id: Product['id']]: Product
}

class ProductsModel {
  products: Product[]
  productMap: ProductMap = {}

  constructor(products: Product[] = []) {
    this.products = products
    this.constructProductMap()
  }

  constructProductMap() {
    this.productMap = this.products.reduce((map, product) => ({ ...map, [product.id]: product }), {})
  }

  getProducts() {
    return this.products
  }

  getProductsById(id: Product['id']) {
    return this.productMap[id]
  }
}

export default ProductsModel
