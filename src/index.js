import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { hydrate as hydrateAppState } from "./appSlice";
import { hydrate as hydrateJobsState } from "./features/randomizers/jobrandomizer/jobRandomizerSlice";
import { hydrate as hydratePhasmoRPGState } from "./features/phasmorpg/phasmoRPGSlice";
import { LOCAL_STORAGE_KEY } from "./constants";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import "./index.css";

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});

// appSlice.js preferences
const getAppStateFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedState) return JSON.parse(persistedState);
  } catch (e) {
    console.log(e);
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
