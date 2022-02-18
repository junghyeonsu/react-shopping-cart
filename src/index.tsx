import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
import App from './App'
import GlobalStyle, { theme } from './globalStyle'

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </ReduxProvider>,
  document.querySelector('#app')
)
