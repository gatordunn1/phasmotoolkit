export const photoValues = {
  ghost: {
    1: 70,
    2: 85,
    3: 100,
  },
  bone: {
    1: 40,
    2: 55,
    3: 70,
  },
  ouijaboard: {
    1: 30,
    2: 45,
    3: 60,
  },
  fingerprints: {
    1: 15,
    2: 30,
    3: 50,
  },
  interaction: {
    1: 20,
    2: 30,
    3: 40,
  },
  footsteps: {
    1: 20,
    2: 30,
    3: 40,
  },
  dirtywater: {
    1: 15,
    2: 25,
    3: 35,
  },
  deadbody: {
    1: 10,
    2: 20,
    3: 30,
  },
};

export const photoDetails = [
  {
    id: "ghost",
    i18nKey: "labels.ghost",
    display: "Ghost",
    limit: 1,
  },
  {
    id: "bone",
    i18nKey: "labels.bone",
    display: "Bone",
    limit: 1,
  },
  {
    id: "ouijaboard",
    i18nKey: "labels.ouijaboard",
    display: "Ouija Board",
    limit: 1,
  },
  {
    id: "fingerprints",
    i18nKey: "labels.fingerprints",
    display: "Fingerprints",
    limit: 10,
  },
  {
    id: "interaction",
    i18nKey: "labels.interaction",
    display: "Interaction",
    limit: 10,
  },
  {
    id: "footsteps",
    i18nKey: "labels.footsteps",
    display: "Footsteps",
    limit: 10,
  },
  {
    id: "dirtywater",
    i18nKey: "labels.dirtywater",
    display: "Dirty Water",
    limit: 10,
  },
  {
    id: "deadbody",
    i18nKey: "labels.deadbody",
    display: "Dead Body",
    limit: 3,
  },
].map((photo) => ({
  ...photo,
  count: 0,
  enabled: true,
}))

export const photoTypes = photoDetails.map((photo) => photo.id);

export const photoDistances = {
  ghost: {
    1: "Taken from greater than 8 meters",
    2: "Taken from between 4 and 8 meters",
    3: "Taken from less than 4 meters",
  },
  other: {
    1: "Taken from greater than 8 meters",
    2: "Taken from between 1.5 and 8 meters",
    3: "Taken from less than 1.5 meters",
  },
};

export const initialState = {
  counts: photoTypes.reduce(
    (types, type) => ({
      ...types,
      [type]: 0,
    }),
    {}
  ),
  subtotals: photoTypes.reduce(
    (types, type) => ({
      ...types,
      [type]: 0,
    }),
    {}
  ),
  photos: photoDetails,
  collected: [],
  count: 0,
  totalValue: 0,
};
