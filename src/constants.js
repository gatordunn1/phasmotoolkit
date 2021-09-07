export const initialState = {
  alerts: [],
  theme: "dark",
  language: "en",
  views: {
    challenges: true,
    evidence: true,
    ghostName: false,
    ghosts: true,
    jobs: true,
    phasmorpg: false,
    photocalculator: true,
  },
};

export const LOCAL_STORAGE_KEY = "phasmoToolkit_state";
