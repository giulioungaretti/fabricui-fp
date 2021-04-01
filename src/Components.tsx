import React from "react";

import { useDispatch } from "react-redux";

import logo from "./fabric.png";
import { navigate, home, counter } from "./Route";


interface IRoute {
  route: string;
}

type Props = {
  children?: React.ReactNode;
};

export const Text = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}


export const Header: React.FC<IRoute> = props => {
  const dispatch = useDispatch();
  return (
    <div>
      <Text>
        {`route: ${props.route}`}
      </Text>
      <button onClick={() => dispatch(navigate(home))} >Home </button>
      <button onClick={() => dispatch(navigate(counter))} > Counter </button>
      <a href="#/counter">use a to go to counter ? </a>
    </div>
  );
};

interface Data {
  someData: string;
}

export const Page: React.FC<Data> = props => {
  return (
    <div >
      <img src={logo} alt="logo" />
      <Text>
        {props.someData}
      </Text>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <div
    >
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
