import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetApp: () => initialState,
    toggleModule: (state, action) => ({
      ...state,
      views: {
        ...state.views,
        [action.payload]: !state.views[action.payload],
      },
    }),
  },
});

export const { resetApp, toggleModule } = appSlice.actions;

export const selectViews = (state) => state.app.views;

export default appSlice.reducer;
