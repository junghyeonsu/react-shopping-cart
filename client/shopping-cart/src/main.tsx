import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import reset from './styles/reset';
import global from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <Global styles={[reset, global]} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
