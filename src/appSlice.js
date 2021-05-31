import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { initialState } from "./constants";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    hydrate: (_, action) => {
      return action.payload;
    },
    resetApp: () => initialState,
    addAlert: (state, action) => {
      state.alerts = [...state.alerts, { ...action.payload, id: nanoid() }];
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
    },
    toggleModule: (state, action) => ({
      ...state,
      views: {
        ...state.views,
        [action.payload]: !state.views[action.payload],
      },
    }),
    togglePhasmoRPG: (state) => {
      const visible = state.views.phasmorpg;
      if (!visible) {
        state.views = Object.keys(initialState.views).reduce((views, view) => ({
          ...views,
          [view]: view === "phasmorpg",
        }), {});
      } else {
        state.views = initialState.views;
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const {
  hydrate,
  resetApp,
  addAlert,
  removeAlert,
  toggleModule,
  togglePhasmoRPG,
  toggleTheme,
} = appSlice.actions;

export const selectViews = (state) => state.app.views;
export const selectThemeName = (state) => state.app.theme;
export const selectAlerts = (state) => state.app.alerts;

export default appSlice.reducer;
