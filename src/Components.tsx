import React from "react";

import {
  Stack,
  Text,
  FontWeights,
  DefaultButton
} from "office-ui-fabric-react";

import { Link, RouteComponentProps } from "react-router-dom";

import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";

import logo from "./fabric.png";

import { setRoute, home } from "./Route";

export const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

interface IRoute {
  route: string;
}

export const Header: React.FC<IRoute> = props => {
  return (
    <Stack
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{
        root: {
          width: "100%",
          height: 40,
          boxShadow: Depths.depth8
        }
      }}
    >
      <Text variant="xxLarge" styles={boldStyle}>
        {`route: ${props.route}`}
      </Text>
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/user/giulio">giulio</Link>
      <Link to="/counter">counter</Link>
      <a href="#/counter">A</a>
      <DefaultButton
        onClick={() => {
          setRoute(home);
        }}
      />
    </Stack>
  );
};

interface Data {
  someData: string;
}

export const Page: React.FC<Data> = props => {
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
    </Stack>
  );
};

export const Home: React.FC<RouteComponentProps & Data> = props => {
  return (
    <>
      <Header route={props.location.pathname} />
      <Page {...props} />
    </>
  );
};
