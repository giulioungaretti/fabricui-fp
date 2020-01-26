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

const updateHash = (to: string): void => {
  const hz = `#${to}`;
  window.location.replace(
    window.location.pathname + window.location.search + hz
  );
};

const setRoute = (location: Location): void => {
  switch (location._tag) {
    case "Home":
      updateHash(format(homeMatch.formatter, location));
      break;
    case "Counter":
      updateHash(format(counterMatch.formatter, location));
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
  navigating: boolean;
}

let initialState: RouteState = {
  location: parseLocation(window.location.hash.substring(1)),
  navigating: false
};

const routerSlice = createSlice({
  name: "router",
  initialState: initialState,
  reducers: {
    navigateStart: (state, action: PayloadAction<NavigationPayload>) => {
      state.navigating = true;
    },
    navigateEnd: (state, action: PayloadAction<NavigationPayload>) => {
      const to = action.payload.to;
      return { location: to, navigating: false };
    }
  }
});

const { navigateStart, navigateEnd } = routerSlice.actions;

export const navigatedTo = (to: Location): AppThunk => dispatch => {
  console.debug("url hash changed to:", to._tag);
  dispatch(navigateEnd({ to: to }));
};

export const navigate = (to: Location): AppThunk => (dispatch, getState) => {
  const state = getState();
  const current = state.location.location;
  console.debug(`navigate from -> to : ${current._tag} -> ${to._tag}`);
  if (current !== to) {
    setRoute(to);
    dispatch(navigateStart({ to: to }));
  }
};

export default routerSlice.reducer;
