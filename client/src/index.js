import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./redux/store";

import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://pi-food-production-689d.up.railway.app";

////////////////////////////////////////////////////////

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
