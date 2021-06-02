const categories = {
  collector: {
    display: "Collector",
    description: "Collects things. All the things.",
    removalCost: 250,
    duration: -1
  },
  obsessive: {
    display: "Obsessive",
    description: "Ritualistic, repetitive behaviors.",
    removalCost: 1250,
    duration: -1,
  },
  nervous: {
    display: "Nervous",
    description: "Accident-prone, high-strung behaviors.",
    removalCost: 750,
    duration: -1,
  },
  reckless: {
    display: "Reckless",
    description: "Impulsive behaviors and tendencies.",
    removalCost: 1000,
    duration: 3,
  },
  silly: {
    display: "Silly",
    description: "Silly and ludicrous behaviors",
    removalCost: 500,
    duration: 3,
  },
  temporary: {
    display: "Temporary",
    description: "Temporary effects and events that end on their own.",
    duration: 1, // Number of missions, default to 1
    removalCost: 1000,
  }
};

export default categories;
