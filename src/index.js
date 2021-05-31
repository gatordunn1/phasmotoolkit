import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import { addAlert } from "./appSlice";
import { hydrate as hydrateAppState } from "./appSlice";
import { hydrate as hydrateJobsState } from "./features/randomizers/jobrandomizer/jobRandomizerSlice";
import { hydrate as hydratePhasmoRPGState } from "./features/phasmorpg/phasmoRPGSlice";
import { LOCAL_STORAGE_KEY } from "./constants";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import "./index.css";
import * as pkgJson from "../package.json";

store.subscribe(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...store.getState(), version: pkgJson.version })
  );
});

const getAppStateFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedState) {
      const parsed = JSON.parse(persistedState);

      // Force expire for previous versions
      if (parsed.version !== pkgJson.version) {
        store.dispatch(
          addAlert({
            severity: "error",
            message: `(App Reset) Upgraded to new version: ${parsed.version} => ${pkgJson.version}`,
          })
        );
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      return parsed;
    }
  } catch (e) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    store.dispatch(
      addAlert({
        severity: "error",
        message: `(App Reset) Application Error (${pkgJson.version}): ${e.message}`,
      })
    );
  }
};

const appState = getAppStateFromLocalStorage();

if (appState) {
  store.dispatch(hydrateAppState(appState.app));
  store.dispatch(hydrateJobsState(appState.randomizers.jobs));
  store.dispatch(hydratePhasmoRPGState(appState.phasmoRPG));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
