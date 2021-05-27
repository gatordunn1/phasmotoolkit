import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { hydrate as hydrateAppPreferences } from "./appSlice";
import { hydrate as hydrateJobsPreferences } from "./features/randomizers/jobrandomizer/jobRandomizerSlice";
import { LOCAL_STORAGE_KEY } from "./constants";

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});

// appSlice.js preferences
const getPreferencesFromLocalStorage = () => {
  try {
    const persistedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (persistedState) return JSON.parse(persistedState);
  } catch (e) {
    console.log(e);
  }
};

const preferences = getPreferencesFromLocalStorage();

if (preferences) {
  store.dispatch(hydrateAppPreferences(preferences.app));
  store.dispatch(hydrateJobsPreferences(preferences.randomizers.jobs))
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
