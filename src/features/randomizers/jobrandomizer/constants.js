import { nanoid } from "nanoid";
import { mdiCrosshairsQuestion, mdiFlashlight, mdiHomeCity, mdiMagnify } from "@mdi/js";

export const randomizerSections = [
  {
    id: "location",
    display: "Location",
    iconPath: mdiHomeCity,
  },
  {
    id: "light",
    display: "Light Source",
    iconPath: mdiFlashlight,
  },
  {
    id: "evidence",
    display: "Evidence",
    iconPath: mdiMagnify,
  },
  {
    id: "other",
    display: "Random",
    iconPath: mdiCrosshairsQuestion,
  },
];

export const sectionTypes = {
  location: {
    id: "location",
    display: "Location",
  },
  light: {
    id: "light",
    display: "Light",
  },
  evidence: {
    id: "evidence",
    display: "Evidence",
  },
  other: {
    id: "other",
    display: "other",
  },
  hidden: {
    id: "hidden",
    display: "hidden",
  },
};

export const itemCategories = {
  onsite: {
    description: "Random spawn items located within the haunted building.",
    display: "Building Items",
  },
  starter: {
    description: "Free items you always start with.",
    display: "Starter Items",
  },
  store: {
    description: "Items that cost money to purchase before the job.",
    display: "Store items",
  },
  truck: {
    description: "Tools secured within the truck. Ex, monitors and camera view.",
    display: "Truck Gear",
  },
};

export const itemTypeDescriptions = {
  evidence: "Items used for gathering direct evidence",
  objectives: "Items used for completing objectives",
  photos: "Items worth photo money",
  junk: "Useless crap or favored treasure?",
  light: "Light sources",
  tools: "Items that are useful for general gameplay",
  other: "Everything else!",
};

export const itemTypes = {
  evidence: {
    id: "evidence",
    display: "Evidence",
    description: itemTypeDescriptions.evidence,
  },
  objectives: {
    id: "objectives",
    display: "Objectives",
    description: itemTypeDescriptions.objectives,
  },
  tools: {
    id: "tools",
    display: "Tools",
    description: itemTypeDescriptions.tools,
  },
  light: {
    id: "light",
    display: "Lights",
    description: itemTypeDescriptions.light,
  },
  junk: {
    id: "junk",
    display: "Junk",
    description: itemTypeDescriptions.junk,
  },
  photos: {
    id: "photos",
    display: "Photos",
    description: itemTypeDescriptions.photos,
  },
  other: {
    id: "other",
    display: "Other",
    description: itemTypeDescriptions.other,
  },
};

export const itemList = [
  {
    display: "Spirit Box",
    displayShort: "Spirit Box",
    category: itemCategories.starter,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "Ghost Writing Book",
    displayShort: "Ghost Book",
    category: itemCategories.starter,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "Photo Camera",
    displayShort: "Photo",
    category: itemCategories.starter,
    type: itemTypes.objectives,
    section: sectionTypes.other,
  },
  {
    display: "EMF Reader",
    displayShort: "EMF",
    category: itemCategories.starter,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "Video Camera",
    displayShort: "Video",
    category: itemCategories.starter,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "UV Flashlight",
    displayShort: "UV Light",
    category: itemCategories.starter,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "Flashlight",
    displayShort: "Light",
    category: itemCategories.starter,
    type: itemTypes.light,
    section: sectionTypes.light,
  },
  {
    display: "Objective Board",
    displayShort: "Objective Board",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Site Map",
    displayShort: "Site Map",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Sanity Monitor",
    displayShort: "Sanity Monitor",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Site Activity Monitor",
    displayShort: "Activity Monitor",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Sound Monitor",
    displayShort: "Sound Monitor",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Camera System",
    displayShort: "Camera System",
    category: itemCategories.truck,
    type: itemTypes.tools,
    section: sectionTypes.hidden,
  },
  {
    display: "Ouija Board",
    displayShort: "Ouija",
    category: itemCategories.onsite,
    type: itemTypes.photos,
    section: sectionTypes.hidden,
  },
  {
    display: "Voodoo Doll",
    displayShort: "Voodoo Doll",
    category: itemCategories.onsite,
    type: itemTypes.photos,
    section: sectionTypes.hidden,
  },
  {
    display: "Bone Evidence",
    displayShort: "Bone",
    category: itemCategories.onsite,
    type: itemTypes.photos,
    section: sectionTypes.hidden,
  },
  {
    display: "Candle",
    displayShort: "Candle",
    category: itemCategories.store,
    type: itemTypes.light,
    section: sectionTypes.light,
  },
  {
    display: "Crucifix",
    displayShort: "Crucifix",
    category: itemCategories.store,
    type: itemTypes.tools,
    section: sectionTypes.other,
  },
  {
    display: "Glow Stick",
    displayShort: "Glow Stick",
    category: itemCategories.store,
    type: itemTypes.evidence,
    section: sectionTypes.light,
  },
  {
    display: "Head Mounted Camera",
    displayShort: "Head Cam",
    category: itemCategories.store,
    type: itemTypes.junk,
    section: sectionTypes.other,
  },
  {
    display: "Infrared Light Sensor",
    displayShort: "Light Sensor",
    category: itemCategories.store,
    type: itemTypes.junk,
    section: sectionTypes.other,
  },
  {
    display: "Lighter",
    displayShort: "Lighter",
    category: itemCategories.store,
    type: itemTypes.light,
    section: sectionTypes.hidden,
  },
  {
    display: "Motion Sensor",
    displayShort: "Motion Sensor",
    category: itemCategories.store,
    type: itemTypes.objectives,
    section: sectionTypes.other,
  },
  {
    display: "Parabolic Microphone",
    displayShort: "Parabolic",
    category: itemCategories.store,
    type: itemTypes.objectives,
    section: sectionTypes.other,
  },
  {
    display: "Salt Shaker",
    displayShort: "Salt",
    category: itemCategories.store,
    type: itemTypes.objectives,
    section: sectionTypes.other,
  },
  {
    display: "Sanity Pills",
    displayShort: "Pills",
    category: itemCategories.store,
    type: itemTypes.tools,
    section: sectionTypes.other,
  },
  {
    display: "Smudge Sticks",
    displayShort: "Smudge",
    category: itemCategories.store,
    type: itemTypes.objectives,
    section: sectionTypes.other,
  },
  {
    display: "Sound Sensor",
    displayShort: "Sound Sensor",
    category: itemCategories.store,
    type: itemTypes.junk,
    section: sectionTypes.other,
  },
  {
    display: "Strong Flashlight",
    displayShort: "Strong Light",
    category: itemCategories.store,
    type: itemTypes.light,
    section: sectionTypes.light,
  },
  {
    display: "Thermometer",
    displayShort: "Thermo",
    category: itemCategories.store,
    type: itemTypes.evidence,
    section: sectionTypes.evidence,
  },
  {
    display: "Tripod",
    displayShort: "Tripod",
    category: itemCategories.store,
    type: itemTypes.junk,
    section: sectionTypes.other,
  },
  {
    display: "None",
    displayShort: "None",
    category: itemCategories.hidden,
    type: itemTypes.junk,
    section: sectionTypes.light,
  },
].map((x) => ({
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export const locationTypes = {
  farm: {
    display: "Farmhouse",
    size: "Small",
  },
  institution: {
    display: "",
    size: "Large",
  },
  road: {
    display: "Road House",
    size: "Small",
  },
  school: {
    display: "School",
    size: "Medium",
  },
  street: {
    display: "Street House",
    size: "Small",
  },
};

export const locationList = [
  {
    display: "Tanglewood Street House",
    type: locationTypes.street,
  },
  {
    display: "Edgefield Street House",
    type: locationTypes.street,
  },
  {
    display: "Ridgeview Road House",
    type: locationTypes.road,
  },
  {
    display: "Grafton Farmhouse",
    type: locationTypes.farm,
  },
  {
    display: "Bleasdale Farmhouse",
    type: locationTypes.farm,
  },
  {
    display: "Brownstone High",
    type: locationTypes.school,
  },
  {
    display: "Prison",
    type: locationTypes.institution,
  },
  {
    display: "Asylum",
    type: locationTypes.institution,
  },
].map((x) => ({
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export const initialState = {
  sectionItems: {
    location: locationList,
    light: itemList.filter((x) => x.section.id === "light"),
    evidence: itemList.filter((x) => x.section.id === "evidence"),
    other: itemList.filter((x) => x.section.id === "other"),
  },
  randomizedCounts: {
    location: 1,
    light: 1,
    evidence: 2,
    other: 4,
  },
  randomized: {
    location: [],
    light: [],
    evidence: [],
    other: [],
  },
};
