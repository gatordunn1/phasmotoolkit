import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./constants";

const getRandomChallenge = (state) => {
  const validChallenges = state.list.filter((challenge) => challenge.enabled && !challenge.used);
  return validChallenges[Math.floor(Math.random() * validChallenges.length)];
};

export const challengeRandomizerSlice = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    resetUsed: (state) => {
      state.list = state.list.map((challenge) => ({
        ...challenge,
        used: false,
      }));
    },
    reset: () => initialState,
    setRandomChallenge: (state) => {
      const random = getRandomChallenge(state);
      const list = state.list.map((challenge) => {
        if (challenge.id === random.id) {
          return {
            ...challenge,
            used: true,
          };
        }
        return challenge;
      });

      return {
        list,
        random,
      };
    },
    toggleCategory: (state, action) => {
      state.list = state.list.map((challenge) => {
        if (challenge.categoryId === action.payload.categoryId) {
          return {
            ...challenge,
            enabled: action.payload.enabled,
          };
        }
        return challenge;
      });
    },
    toggleChallenge: (state, action) => {
      state.list = state.list.map((challenge) => {
        if (challenge.id === action.payload) {
          return {
            ...challenge,
            enabled: !challenge.enabled,
            used: false,
          };
        }
        return challenge;
      });
    },
  },
});

export const { reset, resetUsed, setRandomChallenge, toggleCategory, toggleChallenge } =
  challengeRandomizerSlice.actions;

export const selectRandomizedChallenge = (state) => state.randomizers.challenges.random;
export const selectChallenges = (state) => state.randomizers.challenges.list;

export default challengeRandomizerSlice.reducer;
