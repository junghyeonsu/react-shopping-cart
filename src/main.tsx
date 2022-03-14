import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { store } from './redux/store'
import { queryClient } from './api/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
