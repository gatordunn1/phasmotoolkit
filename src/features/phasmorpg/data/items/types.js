const descriptions = {
  evidence: "Items used for gathering direct evidence",
  objectives: "Items used for completing objectives",
  photos: "Items worth photo money",
  junk: "Useless crap or favored treasure?",
  light: "Light sources",
  tools: "Items that are useful for general gameplay",
  other: "Everything else!",
  lqloot: "Low quality loot items to sell for a small amount of cash.",
  hqloot: "High quality loot items to sell for a large amount of cash.",
};

export const types = {
  evidence: {
    id: "evidence",
    display: "Evidence",
    description: descriptions.evidence,
    dropChance: 0.15,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
  objectives: {
    id: "objectives",
    display: "Objectives",
    description: descriptions.objectives,
    dropChance: 0.15,
    pointValues: {
      buy: 750,
      sell: 250,
    },
  },
  tools: {
    id: "tools",
    display: "Tools",
    description: descriptions.tools,
    dropChance: 0.10,
    pointValues: {
      buy: 500,
      sell: 250,
    },
  },
  light: {
    id: "light",
    display: "Lights",
    description: descriptions.light,
    dropChance: 0.5,
    pointValues: {
      buy: 1500,
      sell: 1000,
    },
  },
  junk: {
    id: "junk",
    display: "Junk",
    description: descriptions.junk,
    dropChance: 0.55,
    pointValues: {
      buy: 100,
      sell: 100,
    },
  },
  photos: {
    id: "photos",
    display: "Photos",
    description: descriptions.photos,
    dropChance: 0.25,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
  other: {
    id: "other",
    display: "Other",
    description: descriptions.other,
    dropChance: 0.25,
    pointValues: {
      buy: 1000,
      sell: 250,
    },
  },
  lqloot: {
    id: "lqloot",
    description: descriptions.lqloot,
    display: "Low Quality Loot",
    dropChance: 0.45,
    pointValues: {
      buy: 99999,
      sell: 25,
    }
  },
  hqloot: {
    id: "hqloot",
    description: descriptions.hqloot,
    display: "High Quality Loot",
    dropChance: 0.30,
    pointValues: {
      buy: 99999,
      sell: 250,
    }
  }
};

export default types;
