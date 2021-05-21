import { createSlice } from '@reduxjs/toolkit';

const ghosts = [
  'Banshee',
  'Demon',
  'Hantu',
  'Jinn',
  'Mare',
  'Oni',
  'Phantom',
  'Poltergeist',
  'Revenant',
  'Shade',
  'Spirit',
  'Wraith',
  'Yokai',
  'Yurei',
];

const initialState = {
  list: [
    {
      name: 'Banshee',
      evidence: ['emflevel5', 'fingerprints', 'freezingtemperatures'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Demon',
      evidence: ['ghostwriting', 'freezingtemperatures', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Hantu',
      evidence: ['fingerprints', 'ghostorbs', 'ghostwriting'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Jinn',
      evidence: ['emflevel5', 'ghostorbs', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Mare',
      evidence: ['freezingtemperatures', 'ghostorbs', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Oni',
      evidence: ['emflevel5', 'ghostwriting', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Phantom',
      evidence: ['emflevel5', 'freezingtemperatures', 'ghostorbs'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Poltergeist',
      evidence: ['fingerprints', 'ghostorbs', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Revenant',
      evidence: ['emflevel5', 'fingerprints', 'ghostwriting'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Shade',
      evidence: ['emflevel5', 'ghostorbs', 'ghostwriting'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Spirit',
      evidence: ['fingerprints', 'ghostwriting', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Wraith',
      evidence: ['fingerprints', 'freezingtemperatures', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Yokai',
      evidence: ['ghostorbs', 'ghostwriting', 'spiritbox'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
    {
      name: 'Yurei',
      evidence: ['freezingtemperatures', 'ghostorbs', 'ghostwriting'],
      description: 'A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.',
      strengths: 'A Banshee will only target one person at a time.',
      weaknesses: 'Banshees fear the Crucifix and will be less aggressive when near one.'
    },
  ],
  selected: null
};

export const ghostsSlice = createSlice({
  name: 'ghosts',
  initialState,
});

// export const { cycle, include, exclude } = ghostsSlice.actions;

export const selectGhosts = (state) => state.ghosts.list;
export const selectSelected = (state) => state.ghosts.selected;

export default ghostsSlice.reducer;
