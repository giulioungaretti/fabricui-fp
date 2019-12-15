import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

import logo from "./fabric.png";
import {
  Stack,
  Text,
  FontWeights,
  DefaultButton
} from "office-ui-fabric-react";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";

import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counter";

import { RootState } from "./store";

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

interface Data {
  someData: string;
}

interface CounterPageState {
  n: number;
  increment: number;
}

interface CounterProps {
  dispatchIncrement: (step: number) => void;
  dispatchDecrement: (step: number) => void;
}

interface IRoute {
  route: string;
}

const Header: React.FC<IRoute> = props => {
  return (
    <Stack
      horizontal
      verticalAlign="center"
      horizontalAlign="center"
      styles={{
        root: {
          width: "100%",
          height: 40,
          boxShadow: Depths.depth8
        }
      }}
    >
      <Text>{props.route}</Text>
    </Stack>
  );
};

const Page: React.FC<Data> = props => {
  return (
    <Stack
      verticalFill
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          width: "100%"
        }
      }}
    >
      <img src={logo} alt="logo" />
      <Text variant="xxLarge" styles={boldStyle}>
        {props.someData}
      </Text>
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/user/asd">asd</Link>
      <Link to="/counter">asd</Link>
    </Stack>
  );
};

const Counter = ({
  location,
  n,
  increment,
  dispatchIncrement,
  dispatchDecrement
}: RouteComponentProps & CounterProps & CounterPageState) => {
  const di = () => {
    dispatchIncrement(increment);
  };
  const de = () => {
    dispatchDecrement(increment);
  };
  return (
    <>
      <Header route={location.pathname} />
      <Stack
        verticalFill
        horizontalAlign="center"
        verticalAlign="center"
        styles={{
          root: {
            width: "100%"
          }
        }}
      >
        <img src={logo} alt="logo" />
        <Stack horizontal>
          <DefaultButton text="+" onClick={di} />
          <Text variant="xxLarge" styles={boldStyle}>
            {`count is: ${n}`}
          </Text>
          <DefaultButton text="-" onClick={de} />
        </Stack>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/user/asd">asd</Link>
      </Stack>
    </>
  );
};

const Home: React.FC<RouteComponentProps & Data> = props => {
  return (
    <>
      <Header route={props.location.pathname} />
      <Page {...props} />
    </>
  );
};

export const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { n } = useSelector((state: RootState) => state.counter);

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
                <Counter
                  {...props}
                  n={n}
                  increment={1}
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
