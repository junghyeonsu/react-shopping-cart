import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store";
import global from "./styles/global";
import reset from "./styles/reset";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={[reset, global]} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
