import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { Stack } from "office-ui-fabric-react";

import { Home } from "./Components";
import { CounterPage } from "./Counter";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./CounterSlice";

import { RootState } from "./store";

export const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { n, error } = useSelector((state: RootState) => state.counter);

  const dispatchIncrement = (step: number) => {
    dispatch(increment({ n: step }));
  };

  const dispatchDecrement = (step: number) => {
    dispatch(decrement({ n: step }));
  };

  return (
    <Stack
      verticalFill
      styles={{
        root: {
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          color: "#605e5c",
          background: "white"
        }
      }}
    >
      <Stack
        verticalFill
        styles={{
          root: {
            width: "100%"
          }
        }}
      >
        <Router>
          <Switch>
            <Route
              exact
              path="/about"
              render={props => <Home {...props} someData="about" />}
            />
            <Route
              exact
              path="/user/:id"
              render={props => <Home {...props} someData="user" />}
            />
            <Route
              exact
              path="/counter"
              render={props => (
                <CounterPage
                  {...props}
                  n={n}
                  increment={1}
                  error={error}
                  dispatchIncrement={dispatchIncrement}
                  dispatchDecrement={dispatchDecrement}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => <Home {...props} someData="home" />}
            />
          </Switch>
        </Router>
      </Stack>
    </Stack>
  );
};

export default App;
