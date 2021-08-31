import items, { maxItemLootChances } from "./data/items";
import maps, { mapCategories, mapActList, iconMapMap } from "./data/maps";
import traits, { onGoingEffects, onGoingEffectMessages } from "./data/traits";

export const data = {
  iconMapMap,
  items,
  mapActList,
  mapCategories,
  maps,
  maxItemLootChances,
  onGoingEffects,
  onGoingEffectMessages,
  traits
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
