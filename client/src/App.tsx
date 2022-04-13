import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductOrderListPage from './pages/ProductOrderListPage'
import CartPage from './pages/CartPage'
import Nav from './components/Nav'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Switch>
            <Nav>
              <Route exact path="/">
                <ProductListPage />
              </Route>
              <Route exact path="/cart">
                <CartPage />
              </Route>
              <Route exact path="/product-order-list">
                <ProductOrderListPage />
              </Route>
            </Nav>
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
