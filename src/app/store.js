import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../appSlice";
import evidenceReducer from "../features/evidence/evidenceSlice";
import ghostNameReducer from "../features/ghostname/ghostNameSlice";
import ghostsReducer from "../features/ghosts/ghostsSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    evidence: evidenceReducer,
    ghosts: ghostsReducer,
    ghostName: ghostNameReducer,
    theme: themeReducer,
  },
});
