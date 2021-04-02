import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import counterReducer from "./CounterSlice";
import routerReducer from "./RouteSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  location: routerReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// NOTE: Action<string> might look strange here, but that's actually the correct type
// of the prop type that is used in a redux action, redux toolkit hides this impementation
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default store;
