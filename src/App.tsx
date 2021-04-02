import { pipe } from "fp-ts/lib/function";
import { getOrElse } from "fp-ts/lib/Option";
import React from "react";
import { Header, NotFoundPage, Text } from "./Components";
import { CounterPage } from "./Counter";
import Home from "./Home";
import { useAppSelector } from "./hook";
import { Location } from "./Route";

const MainPage = (props: { navigating: boolean; location: Location }) => {
  if (props.navigating) {
    return <Text>loading</Text>;
  }
  switch (props.location._tag) {
    case "Home":
      return <Home msg="home"></Home>;
    case "Counter":
      return <CounterPage />;
    case "NotFound":
      return <NotFoundPage />;
    default:
      const _exhaustiveCheck: never = props.location;
      return _exhaustiveCheck;
  }
};

export const App = () => {
  const { n } = useAppSelector((state) => state.counter);
  const { location, navigating } = useAppSelector((state) => state.location);

  return (
    <>
      <Header {...location} />
      <div>
        outside count is{" "}
        {pipe(
          n,
          getOrElse(() => 0)
        )}
      </div>
      <MainPage location={location} navigating={navigating} />
    </>
  );
};

export default App;
