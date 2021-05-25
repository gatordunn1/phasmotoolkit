import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../appSlice";
import challengesReducer from "../features/randomizers/challenges/challengeRandomizerSlice";
import evidenceReducer from "../features/evidence/evidenceSlice";
import ghostNameReducer from "../features/ghostname/ghostNameSlice";
import ghostsReducer from "../features/ghosts/ghostsSlice";
import photoCalculatorReducer from "../features/photocalculator/photoCalculatorSlice";

const randomizerReducers = combineReducers({
  challenges: challengesReducer,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    evidence: evidenceReducer,
    ghosts: ghostsReducer,
    ghostName: ghostNameReducer,
    photoCalculator: photoCalculatorReducer,
    randomizers: randomizerReducers,
  },
});
