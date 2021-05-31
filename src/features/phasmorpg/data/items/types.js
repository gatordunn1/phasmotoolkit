const descriptions = {
  evidence: "Items used for gathering direct evidence",
  objectives: "Items used for completing objectives",
  photos: "Items worth photo money",
  junk: "Useless crap or favored treasure?",
  light: "Light sources",
  tools: "Items that are useful for general gameplay",
  other: "Everything else!",
};

export const types = {
  evidence: {
    id: "evidence",
    display: "Evidence",
    description: descriptions.evidence,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
  objectives: {
    id: "objectives",
    display: "Objectives",
    description: descriptions.objectives,
    pointValues: {
      buy: 750,
      sell: 250,
    },
  },
  tools: {
    id: "tools",
    display: "Tools",
    description: descriptions.tools,
    pointValues: {
      buy: 500,
      sell: 250,
    },
  },
  light: {
    id: "light",
    display: "Lights",
    description: descriptions.light,
    pointValues: {
      buy: 1500,
      sell: 1000,
    },
  },
  junk: {
    id: "junk",
    display: "Junk",
    description: descriptions.junk,
    pointValues: {
      buy: 100,
      sell: 100,
    },
  },
  photos: {
    id: "photos",
    display: "Photos",
    description: descriptions.photos,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
  other: {
    id: "other",
    display: "Other",
    description: descriptions.other,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
};

export default types;
