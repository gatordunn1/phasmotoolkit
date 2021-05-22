import { configureStore } from "@reduxjs/toolkit";
import evidenceReducer from "../features/evidence/evidenceSlice";
import ghostsReducer from "../features/ghosts/ghostsSlice";
import ghostNameReducer from "../features/ghostname/ghostNameSlice";

export const store = configureStore({
  reducer: {
    evidence: evidenceReducer,
    ghosts: ghostsReducer,
    ghostName: ghostNameReducer,
  },
});
