import { createSlice } from "@reduxjs/toolkit";

import { initialState, photoValues } from "./constants";

export const photoTotalConverter = (total) => {
  if (total === 0) return 0;
  if (total >= 1 && total <= 49) return 10;
  if (total >= 50 && total <= 99) return 15;
  if (total >= 100 && total <= 199) return 20;
  if (total >= 200 && total <= 299) return 25;
  if (total >= 300 && total <= 399) return 30;
  if (total >= 400 && total <= 499) return 35;
  if (total >= 500 && total <= 580) return 40;
  if (total > 580) return 40;
};

export const photoCalculatorSlice = createSlice({
  name: "photoCalculator",
  initialState,
  reducers: {
    reset: () => initialState,
    addPhoto: (state, action) => {
      const {
        payload: { id: photoTypeId, stars: photoTypeStars },
      } = action;

      // Current photo point values
      const currentValue = state.collected.reduce(
        (total, photo) => total + photoValues[photo.id][photo.stars],
        0
      );

      // New photo point value
      const newPhotoValue = photoValues[photoTypeId][photoTypeStars];

      // Convert points to payout
      state.totalValue = photoTotalConverter(currentValue + newPhotoValue);

      // Calculate subtotals
      state.subtotals = {
        ...state.subtotals,
        [photoTypeId]: state.subtotals[photoTypeId] + newPhotoValue,
      };

      state.collected = [...state.collected, { ...action.payload, points: newPhotoValue }];

      state.counts = {
        ...state.counts,
        [photoTypeId]: state.counts[photoTypeId] + 1,
      };

      state.count += 1;

      state.photos = state.photos.map((photo) => {
        if (photo.id === photoTypeId) {
          const count = photo.count + 1;

          return {
            ...photo,
            count,
            enabled: count < photo.limit,
          };
        }
        return photo;
      });
    },
    disablePhotoType: (state, action) => {
      state.photos = state.photos.map((photo) => ({
        ...photo,
        count: photo.id === action.payload ? 0 : photo.count,
        enabled: photo.id === action.payload ? false : photo.enabled,
      }));
    },
    removePhoto: (state, action) => {
      const {
        payload: { id: photoTypeId, stars: photoTypeStars },
      } = action;
      state.collected = state.collected.filter(
        (photo) => photo.stars !== photoTypeStars && photo.id !== photoTypeId
      );
    },
  },
});

export const { addPhoto, disablePhotoType, reset } = photoCalculatorSlice.actions;

export const selectCollectedPhotos = (state) => state.photoCalculator.collected;
export const selectTotalValue = (state) => state.photoCalculator.totalValue;
export const selectSubTotalPoints = (state) => state.photoCalculator.subtotals;
export const selectPhotoCounts = (state) => state.photoCalculator.counts;
export const selectPhotoCount = (state) => state.photoCalculator.count;
export const selectPhotos = (state) => state.photoCalculator.photos;

export default photoCalculatorSlice.reducer;
