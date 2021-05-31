import { nanoid } from "nanoid";
import categories from './categories';
import types from './types';

const items = [
  {
    display: "Spirit Box",
    displayShort: "Spirit Box",
    category: categories.starter,
    type: types.evidence,
  },
  {
    display: "Ghost Writing Book",
    displayShort: "Ghost Book",
    category: categories.starter,
    type: types.evidence,
  },
  {
    display: "Photo Camera",
    displayShort: "Photo",
    category: categories.starter,
    type: types.objectives,
  },
  {
    display: "EMF Reader",
    displayShort: "EMF",
    category: categories.starter,
    type: types.evidence,
  },
  {
    display: "Video Camera",
    displayShort: "Video",
    category: categories.starter,
    type: types.evidence,
  },
  {
    display: "UV Flashlight",
    displayShort: "UV Light",
    category: categories.starter,
    type: types.evidence,
  },
  {
    display: "Flashlight",
    displayShort: "Light",
    category: categories.starter,
    type: types.light,
  },
  {
    display: "Objective Board",
    displayShort: "Objective Board",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Site Map",
    displayShort: "Site Map",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Sanity Monitor",
    displayShort: "Sanity Monitor",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Site Activity Monitor",
    displayShort: "Activity Monitor",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Sound Monitor",
    displayShort: "Sound Monitor",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Camera System",
    displayShort: "Camera System",
    category: categories.truck,
    type: types.tools,
  },
  {
    display: "Ouija Board",
    displayShort: "Ouija",
    category: categories.onsite,
    type: types.photos,
  },
  {
    display: "Voodoo Doll",
    displayShort: "Voodoo Doll",
    category: categories.onsite,
    type: types.photos,
  },
  {
    display: "Bone Evidence",
    displayShort: "Bone",
    category: categories.onsite,
    type: types.photos,
  },
  {
    display: "Candle",
    displayShort: "Candle",
    category: categories.store,
    type: types.light,
  },
  {
    display: "Crucifix",
    displayShort: "Crucifix",
    category: categories.store,
    type: types.tools,
  },
  {
    display: "Glow Stick",
    displayShort: "Glow Stick",
    category: categories.store,
    type: types.evidence,
  },
  {
    display: "Head Mounted Camera",
    displayShort: "Head Cam",
    category: categories.store,
    type: types.junk,
  },
  {
    display: "Infrared Light Sensor",
    displayShort: "Light Sensor",
    category: categories.store,
    type: types.junk,
  },
  {
    display: "Lighter",
    displayShort: "Lighter",
    category: categories.store,
    type: types.light,
  },
  {
    display: "Motion Sensor",
    displayShort: "Motion Sensor",
    category: categories.store,
    type: types.objectives,
  },
  {
    display: "Parabolic Microphone",
    displayShort: "Parabolic",
    category: categories.store,
    type: types.objectives,
  },
  {
    display: "Salt Shaker",
    displayShort: "Salt",
    category: categories.store,
    type: types.objectives,
  },
  {
    display: "Sanity Pills",
    displayShort: "Pills",
    category: categories.store,
    type: types.tools,
  },
  {
    display: "Smudge Sticks",
    displayShort: "Smudge",
    category: categories.store,
    type: types.objectives,
  },
  {
    display: "Sound Sensor",
    displayShort: "Sound Sensor",
    category: categories.store,
    type: types.junk,
  },
  {
    display: "Strong Flashlight",
    displayShort: "Strong Light",
    category: categories.store,
    type: types.light,
  },
  {
    display: "Thermometer",
    displayShort: "Thermo",
    category: categories.store,
    type: types.evidence,
  },
  {
    display: "Tripod",
    displayShort: "Tripod",
    category: categories.store,
    type: types.junk,
  },
  {
    display: "None",
    displayShort: "None",
    category: categories.hidden,
    type: types.other,
  },
].map((x) => ({
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export default items;

export const maxItemLootChances = {
  junk: 5,
  evidence: 1,
  objectives: 1,
}