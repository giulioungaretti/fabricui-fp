import { Button } from "@fluentui/react-northstar";
import React from "react";
import { useDispatch } from "react-redux";
import logo from "./fabric.png";
import { counter, home, Location } from "./Route";
import { navigate } from "./RouteSlice";

type Props = {
  children?: React.ReactNode;
};

export const Text = ({ children }: Props) => {
  return <div>{children}</div>;
};

export const Header = (props: Location) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Text>{`route: ${props._tag}`}</Text>
      <Button
        onClick={() => dispatch(navigate(home))}
        content={"Home"}
        primary
      />
      <Button onClick={() => dispatch(navigate(counter))}> Counter </Button>
      <a href="#/counter">use a to go to counter ? </a>
    </div>
  );
};

interface Data {
  someData: string;
}

export const Page = (props: Data) => {
  return (
    <div>
      <img src={logo} alt="logo" />
      <Text>{props.someData}</Text>
    </div>
  );
};

export const NotFoundPage = () => {
  return (
    <div>
      <img src={logo} alt="logo" />
      <Text>
        404: page not found
        <span role="img" aria-label="sad">
          😱
        </span>
      </Text>
    </div>
  );
};
