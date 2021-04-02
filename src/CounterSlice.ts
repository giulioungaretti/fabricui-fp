import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as e from "fp-ts/es6/Either";
import { fold, none, Option, some } from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import { fetchCounter } from "./http";
import { AppThunk } from "./store";

interface Increment {
  n: number;
}

interface State {
  n: Option<number>;
  error: Option<string>;
}

let initialState: State = { n: none, error: none };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (state, action: PayloadAction<Increment>) => {
      state.n = pipe(
        state.n,
        fold(
          () => state.n,
          (x) => some(x + action.payload.n)
        )
      );
    },
    loadedCounter: (state, action: PayloadAction<number>) => {
      state.n = some(action.payload);
    },
    failedCounter: (state, action: PayloadAction<string>) => {
      state.error = some(action.payload);
    },
    decrement: (state, action: PayloadAction<Increment>) => {
      state.n = pipe(
        state.n,
        fold(
          () => state.n,
          (x) => some(x - action.payload.n)
        )
      );
    },
  },
});

export const {
  increment,
  loadedCounter,
  failedCounter,
  decrement,
} = counterSlice.actions;

export default counterSlice.reducer;

const Payload = t.type({
  amount: t.number,
  base: t.string,
});

export const fetchInitialCounter = (): AppThunk => async (dispatch) => {
  try {
    console.log("fire missile!");
    const response = await fetchCounter();
    const parsed = Payload.decode(response);
    if (e.isLeft(parsed)) {
      const errors = PathReporter.report(parsed);
      const msg = `Json parsing error: ${errors.join(
        "\n "
      )} \n payload \n ${JSON.stringify(response, null, "         ")}`;
      console.error(msg);
      dispatch(failedCounter(msg));
    }
    if (e.isRight(parsed)) {
      dispatch(loadedCounter(parsed.right.amount));
    }
  } catch (err) {
    dispatch(failedCounter(err.toString()));
  }
};
