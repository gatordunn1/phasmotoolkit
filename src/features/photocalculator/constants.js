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
    display: "Ghost",
  },
  {
    id: "bone",
    display: "Bone",
  },
  {
    id: "ouijaboard",
    display: "Ouija Board",
  },
  {
    id: "fingerprints",
    display: "Fingerprints",
  },
  {
    id: "interaction",
    display: "Interaction",
  },
  {
    id: "footsteps",
    display: "Footsteps",
  },
  {
    id: "dirtywater",
    display: "Dirty Water",
  },
  {
    id: "deadbody",
    display: "Dead Body",
  },
];

export const photoTypes = photoDetails.map((photo) => photo.id);

export const photoDistances = {
  ghost: {
    1: "> 8 meters",
    2: "4 - 8 meters",
    3: "< 4 meters",
  },
  other: {
    1: "> 8 meters",
    2: "1.5 - 8 meters",
    3: "< 1.5 meters",
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
  collected: [],
  totalValue: 0,
};
