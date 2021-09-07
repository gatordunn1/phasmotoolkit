import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";

const randomize = (array) => array.sort(() => Math.random() - 0.5);

const getRandomizedItems = (state) => {
  const availableLocations = state.sectionItems.location.filter((x) => x.enabled && !x.used);

  const availableLights = state.sectionItems.lights.filter((x) => x.enabled && !x.used);

  const availableEvidence = state.sectionItems.evidence.filter((x) => x.enabled && !x.used);

  const availableOther = state.sectionItems.random.filter((x) => x.enabled && !x.used);

  return {
    location: randomize(availableLocations).slice(0, state.randomizedCounts.location),
    lights: randomize(availableLights).slice(0, state.randomizedCounts.lights),
    evidence: randomize(availableEvidence).slice(0, state.randomizedCounts.evidence),
    random: randomize(availableOther).slice(0, state.randomizedCounts.random),
  };
};

export const jobRandomizerSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return {
        ...state,
        randomizedCounts: action.payload.randomizedCounts,
      };
    },
    reset: () => initialState,
    resetSection: (state, action) => {
      state.sectionItems[action.payload] = initialState.sectionItems[action.payload];
    },
    randomizeJob: (state) => {
      // Generate random items for each section
      const randomized = getRandomizedItems(state);
      state.randomized = randomized;

      // Update the list of items to mark the newly generated items as used
      for (const sectionType of ["location", "lights", "evidence", "random"]) {
        state.sectionItems[sectionType] = state.sectionItems[sectionType].map((item) => ({
          ...item,
          used: randomized[sectionType].map((x) => x.id).includes(item.id) ? true : item.used,
        }));
      }
    },
    updateRandomizerTypeCount: (state, action) => {
      state.randomizedCounts = {
        ...state.randomizedCounts,
        [action.payload.id]: action.payload.count,
      };
    },
  },
});

export const { hydrate, randomizeJob, reset, resetSection, updateRandomizerTypeCount } =
  jobRandomizerSlice.actions;

export const selectRandomized = (state) => state.randomizers.jobs.randomized;
export const selectRandomizedCounts = (state) => state.randomizers.jobs.randomizedCounts;
export const selectSectionItems = (state) => state.randomizers.jobs.sectionItems;

export default jobRandomizerSlice.reducer;
