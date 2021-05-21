import { createSlice } from '@reduxjs/toolkit';
import RadioIcon from '@material-ui/icons/Radio';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import VideocamIcon from '@material-ui/icons/Videocam';

const evidence = [
  {
    id: 'emflevel5',
    long: 'EMF Level 5',
    short: 'EMF 5',
  },
  {
    id: 'fingerprints',
    long: 'Fingerprints',
    short: 'Fingerprints',
  },
  {
    id: 'freezingtemperatures',
    long: 'Freezing Temperatures',
    short: 'Freezing',
  },
  {
    id: 'ghostorbs',
    long: 'Ghost Orbs',
    short: 'Orbs',
  },
  {
    id: 'ghostwriting',
    long: 'Ghost Writing',
    short: 'Writing',
  },
  {
    id: 'spiritbox',
    long: 'Spirit Box',
    short: 'Spirit Box',
  },
];

export const iconMap = (id) => {
  console.log('iconmap', id)
  const map = {
    emflevel5: () => <SettingsInputAntennaIcon />,
    fingerprints: () => <FingerprintIcon />,
    freezingtemperatures: () => <AcUnitIcon />,
    ghostorbs: () => <VideocamIcon />,
    ghostwriting: () => <MenuBookIcon />,
    spiritbox: () => <RadioIcon />,
  };

  return map[id]();
};

const initialState = {
  included: [],
  excluded: [],
  all: evidence,
};

export const evidenceSlice = createSlice({
  name: 'evidence',
  initialState,
  reducers: {
    cycle: (state, action) => {
      const isIncluded = state.included.find((s) => s.id === action.payload.id);
      const isExcluded = state.excluded.find((s) => s.id === action.payload.id);

      if (!isExcluded && !isIncluded) {
        state.included = [...new Set([...state.included, action.payload])];
      }

      if (isIncluded) {
        state.excluded = [...new Set([...state.excluded, action.payload])];
        state.included = state.included.filter(
          (ev) => ev.id !== action.payload.id
        );
      }

      if (isExcluded) {
        state.excluded = state.excluded.filter(
          (ev) => ev.id !== action.payload.id
        );
      }
    },
  },
});

export const { cycle } = evidenceSlice.actions;

export const selectIncluded = (state) => state.evidence.included;
export const selectExcluded = (state) => state.evidence.excluded;
export const selectEvidence = (state) => state.evidence.all;

export default evidenceSlice.reducer;
