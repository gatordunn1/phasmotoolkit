import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import { addAlert } from "./appSlice";
import { hydrate as hydrateAppState } from "./appSlice";
import { hydrate as hydrateJobsState } from "./features/randomizers/jobrandomizer/jobRandomizerSlice";
import { hydrate as hydratePhasmoRPGState } from "./features/phasmorpg/phasmoRPGSlice";
import { LOCAL_STORAGE_KEY } from "./constants";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import semver from "semver";

import "./index.css";
import * as pkgJson from "../package.json";

store.subscribe(() => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...store.getState(), version: pkgJson.version })
  );
});

let initAlerts = [];
let forceReload = false;

const getAppStateFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedState) {
      const parsed = JSON.parse(persistedState);
      const prevMajor = semver.major(parsed.version);
      const prevMinor = semver.minor(parsed.version);
      const currentMinor = semver.minor(pkgJson.version);
      const currentMajor = semver.major(pkgJson.version);

      // Force expire for major/minor version but not for patch versions
      if (currentMajor > prevMajor || (currentMajor === prevMajor && currentMinor > prevMinor)) {
        initAlerts.push({
          severity: "error",
          message: `(App Reset) Upgraded to new version: ${parsed.version} => ${pkgJson.version}`,
        });
        forceReload = true;
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }

      return parsed;
    }
  } catch (e) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    initAlerts.push({
      severity: "error",
      message: `(App Reset) Application Error (${pkgJson.version}): ${e.message}`,
    });
  }
};

const appState = getAppStateFromLocalStorage();

// Only restore if we didn't have to start over with minor/major bump
if (appState && !forceReload) {
  store.dispatch(hydrateAppState(appState.app));
  store.dispatch(hydrateJobsState(appState.randomizers.jobs));
  store.dispatch(hydratePhasmoRPGState(appState.phasmoRPG));
}

if (initAlerts.length > 0) {
  initAlerts.forEach((alert) => {
    store.dispatch(addAlert(alert));
  });
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
