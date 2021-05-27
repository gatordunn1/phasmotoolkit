import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    hydrate: (_, action) => {
      return action.payload;
    },
    resetApp: () => initialState,
    toggleModule: (state, action) => ({
      ...state,
      views: {
        ...state.views,
        [action.payload]: !state.views[action.payload],
      },
    }),
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { hydrate, resetApp, toggleModule, toggleTheme } = appSlice.actions;

export const selectViews = (state) => state.app.views;
export const selectThemeName = (state) => state.app.theme;

export default appSlice.reducer;
