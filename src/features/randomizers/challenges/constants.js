import { nanoid } from 'nanoid'

export const categories = {
  atmospheric: {
    categoryId: "atmospheric",
    categoryDisplay: "Atmospheric",
    categoryDescription: "Lighting, sound, and other ambience related challenges.",
  },
  evidence: {
    categoryId: "evidence",
    categoryDisplay: "Evidence",
    categoryDescription: "Evidence and tool related challenges.",
  },
  insane: {
    categoryId: "insane",
    categoryDisplay: "Insane",
    categoryDescription: "Challenges for those with a deathwish!",
  },  
  silly: {
    categoryId: "silly",
    categoryDisplay: "Silly",
    categoryDescription: "Silly and ridiculous challenges.",
  },
};

const challenges = [
  {
    display: "Starter Items Only",
    description: "Play a round with only the starting items.",
    ...categories.evidence,
  },
  {
    display: "Candle Only (Breaker On)",
    description: "Use only the candle and interior house lights.",
    ...categories.atmospheric,
  },
  {
    display: "Candle Only (Breaker Off)",
    description: "Use only the candle for illumination, no interior house lights.",
    ...categories.atmospheric,
  },
  {
    display: "No Evidence",
    description: "Use secondary evidence only. No primary evidence tools allowed.",
    ...categories.evidence,
  },
  {
    display: "Crab Walk",
    description: "Must crouch and strafe side-to-side. No straight forward/back walking.",
    ...categories.silly,
  },
  {
    display: "Walk Backwards",
    description: "Only walk backwards (sprint allowed).",
    ...categories.silly,
  },
  {
    display: "No Sprinting",
    description: "Walk, do not run, to an early grave!",
    ...categories.insane,
  },
].map((challenge) => ({
  ...challenge,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export const initialState = {
  list: challenges,
  random: null,
  visible: true,
}
