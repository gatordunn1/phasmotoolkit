import { createSlice } from "@reduxjs/toolkit";
import { mdiRadioHandheld } from "@mdi/js";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Icon from '@mdi/react'
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import VideocamIcon from "@material-ui/icons/Videocam";

import { initialState } from "./constants";

export const iconMap = (id) => {
  const map = {
    emflevel5: () => <SettingsInputAntennaIcon />,
    fingerprints: () => <FingerprintIcon />,
    freezingtemperatures: () => <AcUnitIcon />,
    ghostorbs: () => <VideocamIcon />,
    ghostwriting: () => <MenuBookIcon />,
    spiritbox: () => (
      <Icon path={mdiRadioHandheld} title="Spirit Box" size={1} horizontal vertical rotate={180} />
    ),
  };

  return map[id]();
};

export const evidenceSlice = createSlice({
  name: "evidence",
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
        state.included = state.included.filter((ev) => ev.id !== action.payload.id);
      }

      if (isExcluded) {
        state.excluded = state.excluded.filter((ev) => ev.id !== action.payload.id);
      }
    },
    resetEvidence: (state) => {
      state.included = [];
      state.excluded = [];
    },
  },
});

export const { cycle, resetEvidence } = evidenceSlice.actions;

export const selectIncluded = (state) => state.evidence.included;
export const selectExcluded = (state) => state.evidence.excluded;
export const selectEvidence = (state) => state.evidence.all;
export const selectIsPristine = (state) => state.evidence.included.length > 0 || state.evidence.excluded.length > 0;

export default evidenceSlice.reducer;
