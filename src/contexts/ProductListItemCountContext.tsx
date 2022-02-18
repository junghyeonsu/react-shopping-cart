import { createContext, useEffect, useState } from 'react'
import { GNB_HEIGHT, PRODUCT_LIST_PAGE_LAYOUT } from '../constants/layout'

const ProductListItemCountContext = createContext({ itemCount: 0 })

const getRowCountOfGridItem = () => {
  const productListItemHeight =
    PRODUCT_LIST_PAGE_LAYOUT.PRODUCT_LIST_ITEM_HEIGHT + PRODUCT_LIST_PAGE_LAYOUT.PRODUCT_LIST_ITEM_GRID_GAP
  const containerHeight = window.innerHeight - (GNB_HEIGHT + PRODUCT_LIST_PAGE_LAYOUT.PADDING_TOP)

  return Math.ceil(containerHeight / productListItemHeight) + 1
}

const getGridColumnCount = () => {
  const { innerWidth } = window

  if (innerWidth > 1300) {
    return 4
  }

  if (innerWidth > 980) {
    return 3
  }

  if (innerWidth > 768) {
    return 2
  }

  return 1
}

const ProductListItemCountContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [rowCount, setRowCount] = useState(() => getRowCountOfGridItem())
  const [colCount, setColCount] = useState(() => getGridColumnCount())
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setRowCount(getRowCountOfGridItem())
      setColCount(getGridColumnCount())
    })

    resizeObserver.observe(document.body)
    return () => resizeObserver.unobserve(document.body)
  }, [])

  useEffect(() => {
    setItemCount(rowCount * colCount)
  }, [rowCount, colCount])

  return <ProductListItemCountContext.Provider value={{ itemCount }}>{children}</ProductListItemCountContext.Provider>
}

export default ProductListItemCountContext
export { ProductListItemCountContextProvider }
