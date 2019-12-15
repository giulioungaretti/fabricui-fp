import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  RouteComponentProps
} from "react-router-dom";

import { Stack, Text, FontWeights } from "office-ui-fabric-react";

import logo from "./fabric.png";

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

interface Data {
  someData: string;
}

interface IRoute {
  route: string;
}

const Header: React.FC<IRoute> = props => {
  return <div>{props.route}</div>;
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
    </Stack>
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
