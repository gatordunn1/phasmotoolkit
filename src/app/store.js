import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import appReducer from "../appSlice";
import challengesReducer from "../features/randomizers/challenges/challengeRandomizerSlice";
import evidenceReducer from "../features/evidence/evidenceSlice";
import ghostNameReducer from "../features/ghostname/ghostNameSlice";
import ghostsReducer from "../features/ghosts/ghostsSlice";
import jobsReducer from "../features/randomizers/jobrandomizer/jobRandomizerSlice.js";
import phasmoRPGReducer from "../features/phasmorpg/phasmoRPGSlice";
import photoCalculatorReducer from "../features/photocalculator/photoCalculatorSlice";

const randomizerReducers = combineReducers({
  challenges: challengesReducer,
  jobs: jobsReducer,
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    evidence: evidenceReducer,
    ghosts: ghostsReducer,
    ghostName: ghostNameReducer,
    phasmoRPG: phasmoRPGReducer,
    photoCalculator: photoCalculatorReducer,
    randomizers: randomizerReducers,
  },
});
