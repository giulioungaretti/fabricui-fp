import React from "react";

import { Stack, Text, Link, FontWeights } from "office-ui-fabric-react";

import logo from "./fabric.png";

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};
export const App: React.FunctionComponent = () => {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      verticalFill
      styles={{
        root: {
          width: "100%",
          margin: "0 auto",
          textAlign: "center",
          color: "#605e5c"
        }
      }}
    >
      <img src={logo} alt="logo" />

      <Text variant="xxLarge" styles={boldStyle}>
        Welcome to Your UI Fabric App
      </Text>
    </Stack>
  );
};

export default App;
