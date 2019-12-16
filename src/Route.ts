import { lit, end, format, zero, parse, Route } from "fp-ts-routing";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Home {
  readonly _tag: "Home";
}

interface NotFound {
  readonly _tag: "NotFound";
  requested: string;
}

type Location = Home | NotFound;

export const home: Location = { _tag: "Home" };

const notFound = (requested: string): Location => ({
  _tag: "NotFound",
  requested
});

// matches
const defaults = end;
const homeMatch = lit("home").then(end);

// router
const router = zero<Location>()
  .alt(defaults.parser.map(() => home))
  .alt(homeMatch.parser.map(() => home));

// helper
export const parseLocation = (s: string): Location =>
  parse(router, Route.parse(s), notFound(s));

export const setRoute = (location: Location): void => {
  switch (location._tag) {
    case "Home":
      const locations = format(homeMatch.formatter, location);
      window.history.pushState({}, "", `#${locations}`);
      break;
    case "NotFound":
      console.log(location);
      break;
    default:
      const _exhaustiveCheck: never = location;
      return _exhaustiveCheck;
  }
};

//import * as assert from "assert";

//
// parsers
//

//assert.strictEqual(parseLocation("/"), home);
//assert.strictEqual(parseLocation("/home"), home);
//assert.deepEqual(parseLocation("/users/1"), user(1));
//assert.deepEqual(parseLocation("/users/1/invoice/2"), invoice(1, 2));
//assert.strictEqual(parseLocation("/foo"), notFound);

////
//// formatters
////

//assert.strictEqual(format(userMatch.formatter, { userId: 1 }), "/users/1");
//assert.strictEqual(
//format(invoiceMatch.formatter, { userId: 1, invoiceId: 2 }),
//"/users/1/invoice/2"
//);

// redux

interface NavigationPayload {
  to: Location;
}

interface RouteState {
  location: Location;
}

let initialState: RouteState = { location: home };

const routerSlice = createSlice({
  name: "router",
  initialState: initialState,
  reducers: {
    navigate: (state, action: PayloadAction<NavigationPayload>) => {
      return { location: action.payload.to };
    }
  }
});

export const { navigate } = routerSlice.actions;

export default routerSlice.reducer;

//const Payload = t.type({
//amount: t.number,
//base: t.number
//});

//export const fetchInitialCounter = (): AppThunk => async dispatch => {
//try {
//console.log("fire missile!");
//const response = await fetchCounter();
//const parsed = Payload.decode(response);
//if (e.isLeft(parsed)) {
//const errors = PathReporter.report(parsed);
//const msg = `Errors: ${errors.join(", ")}`;
//dispatch(failedCounter(msg));
//}
//if (e.isRight(parsed)) {
//dispatch(loadedCounter(parsed.right.amount));
//}
//} catch (err) {
//dispatch(failedCounter(err.toString()));
//}
//};
