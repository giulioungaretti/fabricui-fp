import { combineReducers, configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import counterReducer from "./CounterSlice";
import routerReducer from "./Route";

const rootReducer = combineReducers({
  counter: counterReducer,
  location: routerReducer
});

const store = configureStore({
  reducer: rootReducer
});

// TODO: not sure about this at all ?
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./", () => {
    const newRootReducer = require("./").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;
