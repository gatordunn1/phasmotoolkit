import { createSlice } from "@reduxjs/toolkit";
import { falseViews, initialState } from "./constants";

const enableView = (view) => ({
  ...falseViews,
  [view]: true,
});

export const ghostNameSlice = createSlice({
  name: "ghostName",
  initialState,
  reducers: {
    resetGhostName: () => initialState,
    setFirstnames: (state, action) => {
      state.firstnames = state.ref.firstnames.filter(
        (firstname) => firstname[0] === action.payload
      );
      // Skip name selection if there's only one match
      if (state.firstnames.length === 1) {
        state.firstname = state.firstnames[0];
        state.views = enableView("lastnameLetters");
        state.step = "lastnameLetters";
        return;
      }
      state.views = enableView("firstnames");
      state.step = "firstnames";
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
      state.views = enableView("lastnameLetters");
      state.step = "lastnameLetters";
    },
    setLastnames: (state, action) => {
      state.lastnames = state.ref.lastnames.filter((lastname) => lastname[0] === action.payload);

      // Skip name selection if there's only one match
      if (state.lastnames.length === 1) {
        state.lastname = state.lastnames[0];
        state.views = enableView("fullname");
        state.step = "lastname";
        state.visible = false;
        return;
      }

      state.views = enableView("lastnames");
      state.step = "lastnames";
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
      state.step = "lastname";
      state.visible = false;
    },
  },
});

export const { resetGhostName, setFirstnames, setFirstname, setLastnames, setLastname } =
  ghostNameSlice.actions;

export const selectIsVisible = (state) => state.ghostName.visible;
export const selectFirstname = (state) => state.ghostName.firstname;
export const selectLastname = (state) => state.ghostName.lastname;
export const selectFirstnames = (state) => state.ghostName.firstnames;
export const selectLastnames = (state) => state.ghostName.lastnames;
export const selectFirstnameLetters = (state) => state.ghostName.firstnameLetters;
export const selectLastnameLetters = (state) => state.ghostName.lastnameLetters;
export const selectViews = (state) => state.ghostName.views;
export const selectInstructions = (state) => state.ghostName.instructions[state.ghostName.step];

export default ghostNameSlice.reducer;
