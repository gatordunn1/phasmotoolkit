import { nanoid } from "nanoid";
import categories from "./categories";
import types from "./types";
import maps from "../maps/";

const allMapIds = maps.map((map) => map.id);

const items = [
  {
    display: "Spirit Box",
    displayShort: "Spirit Box",
    category: categories.starter,
    type: "evidence",
  },
  {
    display: "Ghost Writing Book",
    displayShort: "Ghost Book",
    category: categories.starter,
    type: "evidence",
  },
  {
    display: "Photo Camera",
    displayShort: "Photo",
    category: categories.starter,
    type: "objectives",
  },
  {
    display: "EMF Reader",
    displayShort: "EMF",
    category: categories.starter,
    type: "evidence",
  },
  {
    display: "Video Camera",
    displayShort: "Video",
    category: categories.starter,
    type: "evidence",
  },
  {
    display: "UV Flashlight",
    displayShort: "UV Light",
    category: categories.starter,
    type: "evidence",
  },
  {
    display: "Flashlight",
    displayShort: "Light",
    category: categories.starter,
    type: "other",
  },
  {
    display: "Objective Board",
    displayShort: "Objective Board",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Site Map",
    displayShort: "Site Map",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Sanity Monitor",
    displayShort: "Sanity Monitor",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Site Activity Monitor",
    displayShort: "Activity Monitor",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Sound Monitor",
    displayShort: "Sound Monitor",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Camera System",
    displayShort: "Camera System",
    category: categories.truck,
    type: "tools",
  },
  {
    display: "Ouija Board",
    displayShort: "Ouija",
    category: categories.onsite,
    type: "photos",
  },
  {
    display: "Voodoo Doll",
    displayShort: "Voodoo Doll",
    category: categories.onsite,
    type: "photos",
  },
  {
    display: "Bone Evidence",
    displayShort: "Bone",
    category: categories.onsite,
    type: "photos",
  },
  {
    display: "Candle + Lighter",
    displayShort: "Candle",
    category: categories.store,
    type: "light",
  },
  {
    display: "Crucifix",
    displayShort: "Crucifix",
    category: categories.store,
    type: "tools",
    enabled: false, // Only enabled after certain conditions met
  },
  {
    display: "Glow Stick",
    displayShort: "Glow Stick",
    category: categories.store,
    type: "evidence",
  },
  {
    display: "Head Mounted Camera",
    displayShort: "Head Cam",
    category: categories.store,
    type: "junk",
  },
  {
    display: "Infrared Light Sensor",
    displayShort: "Light Sensor",
    category: categories.store,
    type: "junk",
  },
  {
    display: "Lighter",
    displayShort: "Lighter",
    category: categories.store,
    type: "junk",
  },
  {
    display: "Motion Sensor",
    displayShort: "Motion Sensor",
    category: categories.store,
    type: "objectives",
  },
  {
    display: "Parabolic Microphone",
    displayShort: "Parabolic",
    category: categories.store,
    type: "objectives",
  },
  {
    display: "Salt Shaker",
    displayShort: "Salt",
    category: categories.store,
    type: "objectives",
  },
  {
    display: "Sanity Pills",
    displayShort: "Pills",
    category: categories.store,
    type: "tools",
    enabled: false, // Only enabled after certain conditions met
  },
  {
    display: "Smudge Sticks + Lighter",
    displayShort: "Smudge",
    category: categories.store,
    type: "objectives",
    enabled: false, // Only enabled after certain conditions met
  },
  {
    display: "Sound Sensor",
    displayShort: "Sound Sensor",
    category: categories.store,
    type: "junk",
  },
  {
    display: "Strong Flashlight",
    displayShort: "Strong Light",
    category: categories.store,
    type: "light",
    enabled: false, // Only enabled after certain conditions met
  },
  {
    display: "Thermometer",
    displayShort: "Thermo",
    category: categories.store,
    type: "evidence",
  },
  {
    display: "Tripod",
    displayShort: "Tripod",
    category: categories.store,
    type: "junk",
  },
  {
    display: "None",
    displayShort: "None",
    category: categories.hidden,
    type: "other",
  },
].map((x) => ({
  // Globals (can be overwritten)
  enabled: true,
  used: false,
  allowedMaps: allMapIds,
  pointValues: types[x.type].pointValues,
  dropChance: types[x.type].dropChance,
  ...x,
  // Forced default
  id: nanoid(),
}));

const loot = [
  {
    display: "Mobile Phone",
    displayShort: "Mobile",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: ["tanglewood", "edgefield", "ridgeview"],
  },
  {
    display: "Dirty Wallet",
    displayShort: "Dirty Wallet",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: allMapIds,
  },
  {
    display: "Cheap Necklace",
    displayShort: "Cheap Necklace",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: allMapIds,
  },
  {
    display: "Copper Wiring",
    displayShort: "Copper Wiring",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: allMapIds,
  },
  {
    display: "Fancy Ring",
    displayShort: "Fancy Ring",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: allMapIds,
  },
  {
    display: "Laptop",
    displayShort: "Laptop",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: ["tanglewood", "edgefield", "ridgeview"],
  },
  {
    display: "Dinner Plates",
    displayShort: "Plates",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: ["tanglewood", "edgefield", "ridgeview"],
  },
  {
    display: "Moon Lamp",
    displayShort: "Moon Lamp",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: ["ridgeview"],
    dropChance: 0.15,
    pointValues: {
      buy: 99999,
      sell: 2000,
    }
  },
  {
    display: "Set of Mugs",
    displayShort: "Mugs",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: ["tanglewood", "edgefield", "ridgeview"],
  },
  {
    display: "Voodoo Doll",
    displayShort: "Voodoo Doll",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: ["grafton", "bleasdale"],
    dropChance: 0.15,
    pointValues: {
      buy: 99999,
      sell: 2000,
    }
  },
  {
    display: "Rusty Shiv",
    displayShort: "Shiv",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: ["asylum", "prison"],
    pointValues: {
      buy: 99999,
      sell: 75,
    }
  },
  {
    display: "Billy Club",
    displayShort: "Club",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: ["asylum", "prison"],
    pointValues: {
      buy: 99999,
      sell: 250,
    }
  },
  {
    display: "Warden's Keyring",
    displayShort: "Keyring",
    category: categories.loot,
    type: "hqloot",
    allowedMaps: ["prison"],
    dropChance: 0.15,
    pointValues: {
      buy: 99999,
      sell: 2000,
    }
  },
  {
    display: "Doctor's Wallet",
    displayShort: "Wallet",
    category: categories.loot,
    type: "lqloot",
    allowedMaps: ["asylum"],
    dropChance: 0.15,
    pointValues: {
      buy: 99999,
      sell: 2000,
    }
  },
].map((x) => ({
  // Globals (can be overwritten)
  enabled: true,
  used: false,
  dropChance: types[x.type].dropChance,
  pointValues: types[x.type].pointValues,
  ...x,
  // Forced default
  id: nanoid(),
}));

export default [...items, ...loot];

export const maxItemLootChances = {
  junk: 5,
  evidence: 1,
  objectives: 1,
  lqloot: 5,
  hqloot: 2,
};
