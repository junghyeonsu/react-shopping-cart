import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, matchPath } from 'react-router-dom'
import Gnb from './components/gnb'
import Order from './pages/order'
import OrderedDetail from './pages/orderedDetail'
import OrderedList from './pages/orderedList'
import ProductDetail from './pages/productDetail'
import ProductList from './pages/productList'
import Admin from './pages/admin'
import Cart from './pages/cart'
import { useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { saveLastScroll } from '@/redux/lastScrollSlicer'
import { debounce, promiseDelay } from '@/utils'

export const routePaths = {
  '/': ProductList,
  '/products/:id': ProductDetail,
  '/cart': Cart,
  '/order': Order,
  '/ordered': OrderedList,
  '/ordered/:id': OrderedDetail,
  '/admin': Admin,
}

export type RouteKey = keyof typeof routePaths

const paths = Object.keys(routePaths)

const App = () => {
  const { page: storedPage, scroll: storedScroll } = useAppSelector(
    state => state.lastScrollInfo,
  )
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const currentPage = useRef<RouteKey>('/')
  const scrollRef = useRef<number>(0)

  const setScrollTop = debounce(() => {
    scrollRef.current = document.scrollingElement!.scrollTop
  }, 100)

  const restoreScroll = async () => {
    const prevPage = currentPage.current
    await promiseDelay(150)
    if (prevPage === currentPage.current && storedPage === currentPage.current)
      window.scrollTo(0, storedScroll)
  }

  useEffect(() => {
    const prevPage = currentPage.current
    const targetPage = paths.find(path => matchPath(path, pathname)) as RouteKey
    if (targetPage === prevPage) return

    dispatch(
      saveLastScroll({
        page: prevPage,
        scroll: scrollRef.current,
      }),
    )
    currentPage.current = targetPage
    restoreScroll()
  }, [pathname])

  useEffect(() => {
    window.addEventListener('scroll', setScrollTop)
    return () => {
      window.addEventListener('scroll', setScrollTop)
    }
  }, [])

  return (
    <>
      <Gnb />
      <Routes>
        {Object.entries(routePaths).map(([path, Elem]) => (
          <Route key={path} path={path} element={<Elem />} />
        ))}
      </Routes>
    </>
  )
}
export default App
