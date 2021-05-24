import { nanoid } from 'nanoid'

export const categories = {
  atmospheric: {
    categoryId: "atmospheric",
    categoryDisplay: "Atmospheric",
    categoryDescription: "Lighting, sound, and other ambience related challenges.",
  },
  collections: {
    categoryId: "collections",
    categoryDisplay: "Collections",
    categoryDescription: "Scavenger hunting for different sorts of items found in the buildings.",
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
    display: "Candle Only (Easy)",
    description: "Use only the candle and interior house lights.",
    ...categories.atmospheric,
  },
  {
    display: "Candle Only (Hard)",
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
  {
    display: "Ghost Hunt Photo",
    description: "You must obtain the ghost photo during a hunt.",
    ...categories.insane,
  },
  {
    display: "No Hunt Indicators",
    description: "No flashlights, UV lights, interior lights, or global-talk checks!",
    ...categories.insane,
  },
  {
    display: "Collect: Electronics",
    description: "You must bring all electronic items from the building to the truck.",
    ...categories.collections,
  },
  {
    display: "Collect: Toys",
    description: "You must bring all bears, bunnies, blocks, dolls, etc from the building to the truck.",
    ...categories.collections,
  },
  {
    display: "Collect: Dining Items",
    description: "You must bring all plates, silverware, cups, teapots, etc from the building to the truck.",
    ...categories.collections,
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
