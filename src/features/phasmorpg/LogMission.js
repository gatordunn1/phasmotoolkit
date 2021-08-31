import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "boring-avatars";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";

import uniqBy from "lodash.uniqby";

import { data, Acts } from "./constants";

import {
  addRandomLoot,
  addRandomTrait,
  incrementMissionCounter,
  selectActiveCharacter,
  toggleMissionDrawerOpen,
  updateCharacter,
} from "./phasmoRPGSlice";
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";
import { addAlert } from "../../appSlice";
import { randomNumberInRange, randomizeArray } from "../../utils";

const useStyles = makeStyles((theme) => ({
  characterName: {
    alignItems: "center",
    display: "grid",
    gap: theme.spacing(2),
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(0, -1.5, 0, -1.5),
    padding: theme.spacing(1.25, 0, 1.25, 0),
    "& > span:first-child": {
      margin: theme.spacing(0, 0, -1, 0),
    },
    "& > span:last-child": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      [theme.breakpoints.up("xs")]: {
        width: "80px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100px",
      },
      [theme.breakpoints.up("md")]: {
        width: "120px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "320px",
      },
      [theme.breakpoints.up("xl")]: {
        width: "320px",
      },
    },
  },
  difficulty: {
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    width: "60%",
  },
  formControl: {
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
    margin: theme.spacing(1),
    whiteSpace: "nowrap",
    width: "90%",
  },
  mapSelect: {
    width: "100%",
  },
  missionDetails: {
    display: "grid",
    gap: theme.spacing(1.5),
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    justifyItems: "center",
  },
  missionObjectives: {
    [theme.breakpoints.down("sm")]: {
      "& > label": {
        minWidth: "200px",
      },
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.up("md")]: {
      "& > label:nth-child(even)": {
        "& > span:last-child": {
          minWidth: "145px",
        },
        justifySelf: "flex-end",
      },
      "& > label:nth-child(odd)": {
        justifySelf: "flex-start",
      },
      gridTemplateColumns: "1fr 1fr",
    },
    borderRadius: theme.spacing(0.75),
    display: "grid",
    gap: theme.spacing(1),
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    padding: theme.spacing(1),
    whiteSpace: "nowrap",
  },
  missionObjectivesContainer: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  root: {
    [theme.breakpoints.up("md")]: {
      width: "45vw",
    },
    textAlign: "center",
    width: "80vw",
  },
}));

const renderMapSelectOptions = (act, maps) => {
  const options = maps
    .filter((map) => map.unlocked && map.act === act.id)
    .map((map) => (
      <MenuItem key={map.id} value={map.id}>
        {map.display}
      </MenuItem>
    ));

  return [<ListSubheader key={act.id}>{act.display}</ListSubheader>, options];
};

export default function LogMission() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const activeCharacter = useSelector(selectActiveCharacter);
  const [missionMap, setMissionMap] = React.useState(activeCharacter.maps[0]);
  const [missionDifficulty, setMissionDifficulty] = React.useState(activeCharacter.difficulty);
  const [missionObjectives, setMissionObjectives] = React.useState({
    foundBone: {
      checked: true,
      display: "Found Bone",
      pointValue: 5,
    },
    foundOuijaBoard: {
      checked: false,
      display: "Found Ouija Board",
      pointValue: 10,
    },
    identifiedGhost: {
      checked: true,
      display: "Identified Ghost",
      pointValue: 5,
    },
    maxPhotoReward: {
      checked: false,
      display: "Max Photo Reward ",
      pointValue: 15,
    },
    survivedHunt: {
      checked: false,
      display: "Survived Hunt",
      pointValue: 2,
    },
    survivedMission: {
      checked: true,
      display: "Survived Mission",
      pointValue: 5,
    },
  });

  // Always default to the highest unlocked map
  React.useEffect(() => {
    const unlockedMaps = activeCharacter.maps.filter((m) => m.unlocked);
    setMissionMap(unlockedMaps[unlockedMaps.length - 1]);
  }, [activeCharacter.maps]);

  const handleMapChange = (event) => {
    const map = activeCharacter.maps.find((map) => map.id === event.target.value);
    if (map) setMissionMap(map);
  };

  const handleDifficultyChange = (event) =>
    event.target.value && setMissionDifficulty(event.target.value);

  const handleObjectiveSettings = (event) =>
    setMissionObjectives({
      ...missionObjectives,
      [event.target.name]: {
        ...missionObjectives[event.target.name],
        checked: event.target.checked,
      },
    });

  const handleRandomTrait = () => {
    // Flip a weighted coin to decide if we even get a trait this time
    const acquiredTrait = Math.random() < 1.0;

    // Stop here if we didn't get a trait this time
    if (!acquiredTrait) {
      return dispatch(
        addAlert({ severity: "success", message: "Successfully avoided acquiring new trait!" })
      );
    }

    // Figure out what traits we have left
    const availableTraits = data.traits.filter(
      (trait) => !activeCharacter.traits.some((t) => t.display === trait.display)
    );

    // Do nothing if we have no traits left to choose from
    if (availableTraits.length === 0) {
      return;
    }

    // Otherwise get a random trait from what's left
    const randomTrait = randomizeArray(availableTraits).slice(0, 1)[0];

    dispatch(addRandomTrait(randomTrait));

    dispatch(addAlert({ severity: "warning", message: `Added Trait: ${randomTrait.display}` }));
  };

  const handleRandomLoot = () => {
    const newRandomLoot = data.items
      .filter(
        (item) =>
          ["hqloot", "lqloot"].includes(item.type) &&
          item.allowedMaps.includes(missionMap.id) &&
          Math.random() < item.dropChance
      )
      .slice(0, randomNumberInRange(3, 5));

    const newRandomItems = data.items.filter(
      (item) =>
        ["light", "junk"].includes(item.type) &&
        item.allowedMaps.includes(missionMap.id) &&
        Math.random() < item.dropChance
    );

    const allItems = [...activeCharacter.items, ...newRandomLoot, ...newRandomItems];

    // De-duplicate non-loot
    const nonLoot = uniqBy(
      allItems.filter((item) => !["lqloot", "hqloot"].includes(item.type)),
      "display"
    );

    // Separate out the loot
    const justLoot = allItems.filter((item) => ["lqloot", "hqloot"].includes(item.type));

    // Notify on rare loot
    if (justLoot.find((item) => item.dropChance <= 0.3)) {
      dispatch(addAlert({ severity: "success", message: "Rare loot found!" }));
    }

    const finalItems = [...justLoot, ...nonLoot];

    dispatch(addRandomLoot(finalItems));

    const newLootCount = finalItems.length - activeCharacter.items.length;

    dispatch(
      addAlert({
        severity: "info",
        message: `Found ${newLootCount} ${newLootCount === 1 ? "item" : "items"}`,
      })
    );
  };

  const calculateMissionPoints = (mission) => {
    const multiplier = mission.difficulty / 10;
    const basePoints = mission.map.pointValue;
    let objectivePoints = 0;

    for (const objective in mission.objectives) {
      if (mission.objectives[objective].checked) {
        objectivePoints += mission.objectives[objective].pointValue;
      }
    }

    return (basePoints + objectivePoints) * multiplier;
  };

  const handleMissionResults = () => {
    const mission = {
      difficulty: missionDifficulty,
      map: missionMap,
      objectives: missionObjectives,
    };

    const missionPoints = calculateMissionPoints(mission);
    const totalPoints = missionPoints + activeCharacter.bankedPoints;

    const traits = activeCharacter.traits
      .map((trait) => ({
        ...trait,
        remaining: trait.duration !== -1 && trait.remaining > 0 ? trait.remaining - 1 : -1,
      }))
      .filter((trait) => (trait.duration !== -1 && trait.remaining > 0) || trait.duration === -1);

    const expiredTraitCount = activeCharacter.traits.length - traits.length;

    if (expiredTraitCount > 0) {
      dispatch(
        addAlert({
          severity: "info",
          message: `${expiredTraitCount} ${
            expiredTraitCount > 1 ? "effects" : "effect"
          } has expired! `,
        })
      );
    }

    const updatedCharacter = {
      ...activeCharacter,
      difficulty: missionDifficulty,
      bankedPoints: totalPoints,
      traits,
    };

    const appliedCharacter = {
      ...updateCharacter,
      ...getAppliedOnGoingEffects(updatedCharacter),
    };

    dispatch(updateCharacter(appliedCharacter));

    dispatch(
      addAlert({
        severity: "info",
        message: `Completed ${missionMap.display} for $${missionPoints}!`,
      })
    );
  };

  const getAppliedOnGoingEffects = (updatedCharacter) => {
    const currentEffects = updatedCharacter.traits;
    let appliedCharacter = { ...updatedCharacter };
    // Apply any on-going effects
    for (const effect of currentEffects) {
      if (effect.onGoingEffect) {
        const { key, modifier } = effect.onGoingEffect;

        let alertMessageValue;
        let calculatedModifier;
        switch (key) {
          case "loseMoney":
            calculatedModifier = Math.floor(
              updatedCharacter.bankedPoints - updatedCharacter.bankedPoints * modifier
            );
            alertMessageValue = updatedCharacter.bankedPoints - calculatedModifier;

            break;
          case "breakItems":
            calculatedModifier = modifier;
            alertMessageValue = `${modifier * 100}`;
            break;
          default:
            break;
        }

        appliedCharacter = {
          ...appliedCharacter,
          ...data.onGoingEffects[key](updatedCharacter, calculatedModifier),
        };

        // if (alertMessageValue) {
        //   console.log("fuck you fucker fuck", {
        //     message: data.onGoingEffectMessages[key](alertMessageValue),
        //     alertMessageValue,
        //   });
        //   dispatch(
        //     addAlert({
        //       severity: "error",
        //       message: data.onGoingEffectMessages[key](alertMessageValue),
        //     })
        //   );
        // }
      }
      console.log("returning appliedCharacter", appliedCharacter);
      return appliedCharacter;
    }
  };

  const handleOnGoingEffects = () => {
    const currentEffects = activeCharacter.traits;

    // Apply any on-going effects
    for (const effect of currentEffects) {
      if (effect.onGoingEffect) {
        const { key, modifier } = effect.onGoingEffect;

        let alertMessageValue;
        let calculatedModifier;
        switch (key) {
          case "loseMoney":
            calculatedModifier = Math.floor(
              activeCharacter.bankedPoints - activeCharacter.bankedPoints * modifier
            );
            alertMessageValue = activeCharacter.bankedPoints - calculatedModifier;

            break;
          case "loseItems":
            calculatedModifier = modifier;
            alertMessageValue = `${modifier * 100}`;
            break;
          default:
            break;
        }

        const updatedCharacter = data.onGoingEffects[key](activeCharacter, calculatedModifier);

        if (alertMessageValue) {
          dispatch(
            addAlert({
              severity: "error",
              message: data.onGoingEffectMessages[key](alertMessageValue),
            })
          );
        }
      }
    }
  };

  const handleMissionComplete = () => {
    // Close the mission log
    dispatch(toggleMissionDrawerOpen());

    // Log the mission outcomes
    handleMissionResults();

    // Randomly acquire 0-1 effects
    handleRandomTrait();

    // Randomly acquire 1-many loot items
    handleRandomLoot();

    // Increment mission counter
    dispatch(incrementMissionCounter(missionMap.id));

    // Apply any on-going effects
    // handleOnGoingEffects();

    // Store the rolled-up changes
    // dispatch(updateCharacter(stagedCharacter));
  };

  const difficultyOptions = [
    {
      value: 10,
      display: "Amateur",
    },
    {
      value: 20,
      display: "Intermediate",
    },
    {
      value: 30,
      display: "Professional",
    },
  ];

  return (
    <div className={classes.root}>
      <Readable>
        <Accent className={classes.characterName} size="1.2em" color="accent">
          <span>
            <Avatar
              key={`key_${activeCharacter.name}`}
              name={activeCharacter.name}
              variant="beam"
              size="30px"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </span>
          <Accent size="1.2em" color="accent" transform="uppercase">
            Details
          </Accent>
          <span title={activeCharacter.name}>{activeCharacter.name}</span>
        </Accent>
      </Readable>
      <div className={classes.missionDetails}>
        <div className={classes.mapSelect}>
          <FormControl className={classes.formControl}>
            <InputLabel id="mission-details-log-map">Location</InputLabel>
            <Select
              labelId="mission-details-log-map"
              value={missionMap.id}
              id="mission-details-log-map-select"
              onChange={handleMapChange}
            >
              {Acts.map((act) => renderMapSelectOptions(act, activeCharacter.maps))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="mission-details-log-map">Difficulty</InputLabel>
            <Select
              labelId="mission-details-log-map"
              value={missionDifficulty}
              id="mission-details-log-map-select"
              onChange={handleDifficultyChange}
            >
              {difficultyOptions.map((difficulty) => (
                <MenuItem key={difficulty.display} value={difficulty.value}>
                  {difficulty.display}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.missionObjectivesContainer}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              <Accent size="1.1em" color="accent" transform="uppercase">
                Completed Objectives
              </Accent>
            </FormLabel>
            <FormGroup className={classes.missionObjectives}>
              {Object.keys(missionObjectives).map((objectiveKey) => (
                <FormControlLabel
                  key={objectiveKey}
                  control={
                    <Checkbox
                      checked={missionObjectives[objectiveKey].checked}
                      onChange={handleObjectiveSettings}
                      name={objectiveKey}
                    />
                  }
                  label={missionObjectives[objectiveKey].display}
                />
              ))}
            </FormGroup>
            <FormHelperText>On Your Honor!</FormHelperText>
          </FormControl>
        </div>
        <Button onClick={() => handleMissionComplete()} variant="outlined">
          Complete Mission
        </Button>
      </div>
    </div>
  );
}
