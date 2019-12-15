import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Stack,
  Text,
  DefaultButton,
  Spinner,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { Header, boldStyle } from "./Components";
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

interface IErrorBarProps {
  error: string;
}

const ErrorBar = (p: IErrorBarProps) => (
  <MessageBar
    messageBarType={MessageBarType.error}
    isMultiline={false}
    truncated={true}
    onDismiss={() => window.location.reload()}
    dismissButtonAriaLabel="Close"
  >
    {p.error}
  </MessageBar>
);

export const CounterPage = ({
  location,
  n,
  increment,
  error,
  dispatchIncrement,
  dispatchDecrement
}: RouteComponentProps & CounterProps & CounterPageState) => {
  const [localIncrement, setLocalIncrement] = useState(increment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialCounter());
  }, [dispatch]);
  const isLoading = isNone(n);
  let body = pipe(
    n,
    fold(
      () => <Spinner />,
      counter => (
        <>
          <Text variant="xxLarge" styles={boldStyle}>
            {`count is: ${counter}`}
          </Text>
        </>
      )
    )
  );
  return (
    <>
      <Header route={location.pathname} />
      {pipe(
        error,
        fold(
          () => (
            <>
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
                <Stack horizontal>
                  <DefaultButton
                    disabled={isLoading}
                    text="+"
                    onClick={() => {
                      dispatchIncrement(localIncrement);
                    }}
                  />
                  {body}
                  <DefaultButton
                    disabled={isLoading}
                    text="-"
                    onClick={() => {
                      dispatchDecrement(localIncrement);
                    }}
                  />
                </Stack>
                <Stack horizontal>
                  <DefaultButton
                    disabled={isLoading}
                    text="+"
                    onClick={() => {
                      setLocalIncrement(localIncrement + 1);
                    }}
                  />
                  <Text variant="xxLarge" styles={boldStyle}>
                    {`increment is: ${localIncrement}`}
                  </Text>
                  <DefaultButton
                    disabled={isLoading}
                    text="-"
                    onClick={() => {
                      setLocalIncrement(localIncrement - 1);
                    }}
                  />
                </Stack>
              </Stack>
            </>
          ),
          error => <ErrorBar error={error} />
        )
      )}
    </>
  );
};
