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
    resetGhostName: (state) => {
      state = initialState;
    },
    setFirstnames: (state, action) => {
      state.firstnames = state.ref.firstnames.filter(
        (firstname) => firstname[0] === action.payload
      );
      state.views = enableView("firstnames");
    },
    setFirstname: (state, action) => {
      state.firstname = action.payload;
      state.views = enableView("lastnameLetters");
    },
    setLastnames: (state, action) => {
      state.lastnames = state.ref.lastnames.filter((lastname) => lastname[0] === action.payload);
      state.views = enableView("lastnames");
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
      state.fullname = `${state.firstname} ${action.payload}`;
      state.views = enableView("fullname");
    },
  },
});

export const { resetGhostName, setFirstnames, setFirstname, setLastnames, setLastname } = ghostNameSlice.actions;

export const selectFullname = (state) => state.ghostName.fullname;
export const selectFirstname = (state) => state.ghostName.firstname;
export const selectLastname = (state) => state.ghostName.lastname;
export const selectFirstnames = (state) => state.ghostName.firstnames;
export const selectLastnames = (state) => state.ghostName.lastnames;
export const selectFirstnameLetters = (state) => state.ghostName.firstnameLetters;
export const selectLastnameLetters = (state) => state.ghostName.lastnameLetters;
export const selectViews = (state) => state.ghostName.views;

export default ghostNameSlice.reducer;
