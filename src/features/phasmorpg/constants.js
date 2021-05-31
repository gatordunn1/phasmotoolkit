import items, { maxItemLootChances } from "./data/items";
import traits from "./data/traits";
import maps, { mapCategories, mapActList, iconMapMap } from "./data/maps";

export const data = {
  items,
  maps,
  mapCategories,
  mapActList,
  iconMapMap,
  traits,
  maxItemLootChances,
};

export const initialState = {
  characters: [],
  missionDrawerOpen: false,
};

export const Acts = [
  {
    id: "act1",
    display: "Act One",
  },
  {
    id: "act2",
    display: "Act Two",
  },
  {
    id: "act3",
    display: "Act Three",
  },
];
