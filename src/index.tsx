import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";

import { navigatedTo, parseLocation } from "./Route";

const render = () => {

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// Handle browser navigation events
window.addEventListener(
  "hashchange",
  () => {
    var location = parseLocation(window.location.hash.substring(1));
    store.dispatch(navigatedTo(location));
  },
  false
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
