import { createGlobalStyle } from 'styled-components'

const theme = {
  color: {
    primary: '#2ac1bc',
    black: '#000000',
    white: '#ffffff',
    gray50: '#e7e7e7',
    gray100: '#dddddd',
    gray150: '#c7c7c7',
    gray200: '#b7b7b7',
    gray250: '#a7a7a7',
    gray300: '#979797',
    gray350: '#888888',
    gray400: '#777777',
    gray450: '#676767',
    gray500: '#575757',
    gray600: '#373737',
    brown: '#73675c',
  },
}

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
  }

  h1, h2, h3,
  p {
    margin: 0;
    padding: 0;
  }


  button {
    border: none;
    background-color: transparent;
    padding: 0px;
    cursor: pointer;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  input {
    background: none;
    border: none;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle
export { theme }
