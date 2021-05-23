import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";

export const themeWrapperSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeType = state.themeType === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeWrapperSlice.actions;

export const selectThemeType = (state) => state.theme.themeType;
export const selectThemeTypes = (state) => state.theme.themesTypes;
export const selectPalette = (state) => state.theme.themes[state.theme.themeType];

export default themeWrapperSlice.reducer;
