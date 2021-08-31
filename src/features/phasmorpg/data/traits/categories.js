const categories = {
  collector: {
    description: "Collects things. All the things.",
    display: "Collector",
    duration: -1,
    removalCost: 250
  },
  expensive: {
    description: "Negatively affects player money each round",
    display: "Expensive",
    duration: -1,
    removalCost: 1500
  },
  nervous: {
    description: "Accident-prone, high-strung behaviors.",
    display: "Nervous",
    duration: -1,
    removalCost: 750
  },
  obsessive: {
    description: "Ritualistic, repetitive behaviors.",
    display: "Obsessive",
    duration: -1,
    removalCost: 1250
  },
  reckless: {
    description: "Impulsive behaviors and tendencies.",
    display: "Reckless",
    duration: 3,
    removalCost: 1000
  },
  silly: {
    description: "Silly and ludicrous behaviors",
    display: "Silly",
    duration: 3,
    removalCost: 500
  },
  temporary: {
    description: "Temporary effects and events that end on their own.",
    display: "Temporary",
    duration: 1,
    // Number of missions, default to 1
    removalCost: 1000
  }
}

export default categories;
