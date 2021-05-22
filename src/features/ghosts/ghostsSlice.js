import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";

export const ghostsSlice = createSlice({
  name: "ghosts",
  initialState,
  reducers: {
    setActiveGhost: (state, action) => {
      state.selected = action.payload;
    },
    resetGhosts: (state) => {
      state.selected = null;
    },
    updateGhosts: (state, { payload: { included, excluded } }) => {
      const updatedGhosts = state.list.map((ghost) => {
        if (excluded.some((ev) => ghost.evidence.includes(ev.id))) {
          return {
            ...ghost,
            included: false,
          };
        }

        if (included.some((ev) => !ghost.evidence.includes(ev.id))) {
          return {
            ...ghost,
            included: false,
          };
        }

        return {
          ...ghost,
          included: true,
        };
      });
      state.list = updatedGhosts;
    },
  },
});

export const { resetGhosts, setActiveGhost, updateGhosts } = ghostsSlice.actions;

export const selectGhosts = (state) => state.ghosts.list;
export const selectSelected = (state) => state.ghosts.selected;

export default ghostsSlice.reducer;
