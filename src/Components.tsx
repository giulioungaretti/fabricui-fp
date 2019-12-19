import React from "react";

import {
  DefaultButton,
  Stack,
  Text,
  FontWeights
} from "office-ui-fabric-react";

import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { useDispatch } from "react-redux";

import logo from "./fabric.png";
import { navigate, home, counter } from "./Route";

export const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

interface IRoute {
  route: string;
}

export const Header: React.FC<IRoute> = props => {
  const dispatch = useDispatch();
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
      <DefaultButton
        onClick={() => dispatch(navigate({ to: home }))}
        text="home"
      />
      <DefaultButton
        onClick={() => dispatch(navigate({ to: counter }))}
        text="counter startNavigation"
      />
      <a href="#/counter"> test</a>
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

export const NotFoundPage: React.FC = () => {
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
        404: page not found
        <span role="img" aria-label="sad">
          😱
        </span>
      </Text>
    </Stack>
  );
};
