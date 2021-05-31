import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { nanoid } from "nanoid";

const getActiveCharacter = (state) => state.characters.find((character) => character.isActive);

const calculateMissionPoints = (mission) => {
  const multiplier = mission.difficulty / 10;
  const basePoints = mission.map.type.pointValue;
  let objectivePoints = 0;
  for (const objective in mission.objectives) {
    objectivePoints += mission.objectives[objective].pointValue;
  }

  return (basePoints + objectivePoints) * multiplier;
};

export const phasmoRPGSlice = createSlice({
  name: "phasmoRPG",
  initialState,
  reducers: {
    completeMission: (state, action) => {
      const activeCharacter = getActiveCharacter(state);
      const missionPoints = calculateMissionPoints(action.payload);
      const totalPoints = missionPoints + activeCharacter.bankedPoints;

      const nextLockedMap = activeCharacter.maps.find((map) => !map.unlocked);

      state.characters = state.characters.map((character) => ({
        ...character,
        difficulty: action.payload.difficulty,
        bankedPoints: character.id === activeCharacter.id ? totalPoints : character.bankedPoints,
        maps: character.maps.map((map) => ({
          ...map,
          unlockable: map.id === nextLockedMap.id && totalPoints >= map.pointCost,
        })),
      }));
    },
    addRandomTrait: (state, action) => {
      const activeCharacter = getActiveCharacter(state);

      state.characters = state.characters.map((character) => ({
        ...character,
        traits:
          character.id === activeCharacter.id
            ? [...character.traits, action.payload]
            : character.traits,
      }));
    },
    addRandomLoot: (state, action) => {
      const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);
      const activeCharacter = getActiveCharacter(state);

      state.characters[activeCharacterIndex] = {
        ...activeCharacter,
        items: [...activeCharacter.items, ...action.payload],
      };
    },
    buyItem: (state, action) => {
      const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);
      const activeCharacter = getActiveCharacter(state);

      state.characters[activeCharacterIndex] = {
        ...activeCharacter,
        bankedPoints: activeCharacter.bankedPoints - action.payload.type.pointValues.buy,
        items: [...activeCharacter.items, action.payload],
      };
    },
    sellItem: (state, action) => {
      const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);
      const activeCharacter = getActiveCharacter(state);

      state.characters[activeCharacterIndex] = {
        ...activeCharacter,
        bankedPoints: activeCharacter.bankedPoints + action.payload.type.pointValues.sell,
        items: activeCharacter.items.filter((item) => item.id !== action.payload.id),
      };
    },
    removeTrait: (state, action) => {
      const activeCharacter = getActiveCharacter(state);
      const traitCost = activeCharacter.traits.find(
        (trait) => trait.display === action.payload.display
      ).category.removalCost;

      // Verify funds
      if (activeCharacter.bankedPoints >= traitCost) {
        const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);

        const updatedCharacterTraits = activeCharacter.traits.filter(
          (trait) => trait.display !== action.payload.display
        );

        state.characters[activeCharacterIndex] = {
          ...state.characters[activeCharacterIndex],
          traits: updatedCharacterTraits,
          bankedPoints: activeCharacter.bankedPoints - traitCost,
        };
      }
    },
    deleteCharacter: (state, action) => {
      state.characters = state.characters.filter((character) => character.id !== action.payload.id);
    },
    saveCharacter: (state, action) => {
      const character = state.characters.find(
        (character) => character.name === action.payload.name
      );

      const characterDetails = {
        ...action.payload,
        isActive: true,
        bankedPoints: (character && character.bankedPoints) || 0,
        id: (character && character.id) || nanoid(),
      };

      if (character) {
        state.characters = state.characters.map((character) => {
          if (character.id === action.payload.id) {
            return characterDetails;
          }
          return character;
        });
      } else {
        state.characters = [...state.characters, characterDetails];
      }
    },
    setCharacterActive: (state, action) => {
      state.characters = state.characters.map((character) => ({
        ...character,
        isActive: character.id === action.payload,
      }));
    },
    setNextUnlockableMap: (state) => {
      const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);
      const maps = state.characters[activeCharacterIndex].maps;
      const bankedPoints = state.characters[activeCharacterIndex].bankedPoints;
      const nextLockedMap = maps.find((map) => !map.unlocked);

      if (nextLockedMap) {
        state.characters[activeCharacterIndex].maps = maps.map((map) => ({
          ...map,
          unlockable: nextLockedMap.id === map.id && bankedPoints >= map.pointCost && !map.unlocked,
        }));
      }
    },
    toggleMissionDrawerOpen: (state) => {
      state.missionDrawerOpen = !state.missionDrawerOpen;
    },
    unlockMap: (state, action) => {
      const activeCharacterIndex = state.characters.findIndex((c) => c.isActive);
      const bankedPoints = state.characters[activeCharacterIndex].bankedPoints;
      const maps = state.characters[activeCharacterIndex].maps;

      let didSpendPoints = false;
      let mapCost = 0;
      let updatedCharacter = {
        ...state.characters[activeCharacterIndex],
        maps: maps.map((map) => {
          if (map.id === action.payload && bankedPoints >= map.pointCost) {
            didSpendPoints = true;
            mapCost = map.pointCost;
            return {
              ...map,
              unlocked: true,
              unlockable: false,
            };
          }

          return map;
        }),
      };
      if (didSpendPoints) {
        updatedCharacter = {
          ...updatedCharacter,
          bankedPoints: bankedPoints - mapCost,
        };
      }
      state.characters[activeCharacterIndex] = updatedCharacter;
    },
    hydrate: (state, action) => {
      return {
        ...state,
        characters: action.payload.characters,
      };
    },
    reset: () => initialState,
  },
});

export const {
  hydrate,
  reset,
  buyItem,
  sellItem,
  addRandomTrait,
  completeMission,
  deleteCharacter,
  removeTrait,
  saveCharacter,
  setCharacterActive,
  setNextUnlockableMap,
  setPreviewCharacter,
  toggleMissionDrawerOpen,
  addRandomLoot,
  unlockMap,
} = phasmoRPGSlice.actions;

export const selectCharacters = (state) => state.phasmoRPG.characters;
export const selectActiveCharacter = (state) =>
  state.phasmoRPG.characters.find((character) => character.isActive);

export const selectMissionDrawerOpen = (state) => state.phasmoRPG.missionDrawerOpen;

export default phasmoRPGSlice.reducer;
