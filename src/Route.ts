import { lit, end, format, zero, parse, Route } from "fp-ts-routing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";

interface Home {
  readonly _tag: "Home";
}

interface Counter {
  readonly _tag: "Counter";
}

interface NotFound {
  readonly _tag: "NotFound";
  requested: string;
}

type Location = Home | NotFound | Counter;

export const home: Location = { _tag: "Home" };
export const counter: Location = { _tag: "Counter" };

const notFound = (requested: string): Location => ({
  _tag: "NotFound",
  requested
});

// matches
const defaults = end;
const homeMatch = lit("home").then(end);
const counterMatch = lit("counter").then(end);

// router
const router = zero<Location>()
  .alt(defaults.parser.map(() => home))
  .alt(homeMatch.parser.map(() => home))
  .alt(counterMatch.parser.map(() => counter));

// helper
export const parseLocation = (s: string): Location =>
  parse(router, Route.parse(s), notFound(s));

export const setRoute = (location: Location): void => {
  console.log("setRoute: ", location);
  switch (location._tag) {
    case "Home":
      const homeLocation = format(homeMatch.formatter, location);
      console.log("setRoute *********: ", homeLocation);
      const hz = `#${homeLocation}`;
      //      window.history.pushState({}, "", hz );
      window.location.replace(
        window.location.pathname + window.location.search + hz
      );
      break;
    case "Counter":
      const counterLocation = format(counterMatch.formatter, location);
      const cu = `#${counterLocation}`;
      //window.history.pushState({}, "", cu);
      console.log("setRoute------->: ", counterLocation);
      window.location.replace(
        window.location.pathname + window.location.search + cu
      );
      break;
    case "NotFound":
      console.log("not found", location);
      break;
    default:
      const _exhaustiveCheck: never = location;
      return _exhaustiveCheck;
  }
};

interface NavigationPayload {
  to: Location;
}

interface NavigationPayload {
  to: Location;
}

interface RouteState {
  location: Location;
}

let initialState: RouteState = {
  location: parseLocation(window.location.hash.substring(1)),
};

const routerSlice = createSlice({
  name: "router",
  initialState: initialState,
  reducers: {
    navigate: (state, action: PayloadAction<NavigationPayload>) => {
      const from = state.location;
      const to = action.payload.to;
      console.debug(`navigate from ${from} to:${to}`);
      if (from !== to) {
        setRoute(to);
        return { location: to };
      } else {
        return state
      }
    }
  }
});

export const { navigate } = routerSlice.actions;

export default routerSlice.reducer;