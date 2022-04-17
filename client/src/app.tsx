import normalize from 'emotion-normalize'
import { css, Global } from '@emotion/react'
import { ReactNode } from 'react'
import { HashRouter } from 'react-router-dom'
import CleanCodeRouter from './routes'
import Nav from './components/Nav'
import { Provider } from 'react-redux'
import { store } from './core/redux/store'
import { ToastContainer } from 'react-toastify'
import colors from './constants/colors'
import styled from '@emotion/styled'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        height: auto;
      `}
    >
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Global
          styles={css`
            ${normalize}
          `}
        />
        <Layout>
          <Nav />
          <CleanCodeRouter />
          <StyledToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </HashRouter>
    </Provider>
  )
}

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__progress-bar {
    background: ${colors.primary};
  }
`
