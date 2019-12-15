import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

import { mergeStyles } from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ":global(body), :global(html), :global(#root)": {
      margin: 0,
      padding: 0,
      height: "100vh",
      width: "100vw",
      background: "red"
    }
  }
});

const render = () => {
  const App = require("./App").default;

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
