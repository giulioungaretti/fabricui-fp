import React, { useState, useEffect } from "react";

import { Text, Header } from "./Components";
import { Option, fold, isNone } from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { useDispatch } from "react-redux";
import { fetchInitialCounter } from "./CounterSlice";

interface CounterPageState {
  n: Option<number>;
  increment: number;
  error: Option<string>;
}

interface CounterProps {
  dispatchIncrement: (step: number) => void;
  dispatchDecrement: (step: number) => void;
}

interface RouteProps {
  location: string;
}

interface IErrorBarProps {
  error: string;
}

const ErrorBar = (p: IErrorBarProps) => (
  <div>
    {p.error}
  </div>
);

export const CounterPage = ({
  location,
  n,
  increment,
  error,
  dispatchIncrement,
  dispatchDecrement
}: RouteProps & CounterProps & CounterPageState) => {
  const [localIncrement, setLocalIncrement] = useState(increment);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(fetchInitialCounter());
    },
    [dispatch]
  );
  const isLoading = isNone(n);
  let body = pipe(
    n,
    fold(
      () => <Text>loading</Text>,
      counter => (
        <>
          <Text >
            {`count is: ${counter}`}
          </Text>
        </>
      )
    )
  );
  return (
    <>
      <Header route={location} />
      {pipe(
        error,
        fold(
          () => (
            <>
              <div >
                <button
                  disabled={isLoading}
                  onClick={() => {
                    dispatchIncrement(localIncrement);
                  }}
                > + </button>
                {body}
                <button
                  disabled={isLoading}
                  onClick={() => {
                    dispatchDecrement(localIncrement);
                  }}
                >+</button>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setLocalIncrement(localIncrement + 1);
                  }}
                > +1 </button>
                <Text>
                  {`increment is: ${localIncrement}`}
                </Text>
                <button
                  disabled={isLoading}
                  onClick={() => {
                    setLocalIncrement(localIncrement - 1);
                  }}
                >-1</button>/
              </div>
            </>
          ),
          error => <ErrorBar error={error} />
        )
      )}
    </>
  );
};
