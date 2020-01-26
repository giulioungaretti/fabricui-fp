import React from "react";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Stack, Spinner } from "office-ui-fabric-react";

import { NotFoundPage } from "./Components";
import { CounterPage } from "./Counter";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./CounterSlice";

import { RootState } from "./store";

export const App: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { n, error } = useSelector((state: RootState) => state.counter);
  const { location, navigating } = useSelector(
    (state: RootState) => state.location
  );

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
        {(() => {
          //console.log("currentpage", location._tag);
          if (navigating) {
            return <Spinner />;
          }
          switch (location._tag) {
            case "Home":
            case "Counter":
              return (
                <CounterPage
                  {...{ location: location._tag }}
                  n={n}
                  increment={1}
                  error={error}
                  dispatchIncrement={dispatchIncrement}
                  dispatchDecrement={dispatchDecrement}
                />
              );
            case "NotFound":
              return <NotFoundPage />;
            default:
              const _exhaustiveCheck: never = location;
              return _exhaustiveCheck;
          }
        })()}
      </Stack>
    </Stack>
  );
};

export default App;
