import { navigatedTo, parseLocation } from "./RouteSlice";
import store from "./store";

/**
 *  Router listens to hashchanges and dispatches navigatedTo aciont
 * */
const Router = () => {
  // listen to
  window.addEventListener(
    "hashchange",
    () => {
      var location = parseLocation(window.location.hash.substring(1));
      store.dispatch(navigatedTo(location));
    },
    false
  );
};
export default Router;
