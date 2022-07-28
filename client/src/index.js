import React from "react";
import ReactDOM from "react-dom";
// import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./redux/store";

import "./index.css";

////////////////////////////////////////////////////////

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// reportWebVitals();
