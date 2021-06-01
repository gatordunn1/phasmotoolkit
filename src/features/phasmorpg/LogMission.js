import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
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
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import { data, Acts } from "./constants";

import {
  addRandomLoot,
  addRandomTrait,
  selectActiveCharacter,
  toggleMissionDrawerOpen,
  updateCharacter,
} from "./phasmoRPGSlice";
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";
import { addAlert } from "../../appSlice";
import { randomizeArray, randomNumberInRange } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80vw",
    [theme.breakpoints.up("md")]: {
      width: "45vw",
    },
    textAlign: "center",
    padding: theme.spacing(1.5, 0, 1.5, 0),
  },
  missionDetails: {
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    justifyContent: "center",
    gap: theme.spacing(1.5),
  },
  difficulty: {
    width: "60%",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
  difficultySlider: {
    width: "65%",
    display: "inline-block",
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
    [theme.breakpoints.up("md")]: {
      width: "90%",
    },
  },
  mapSelect: {
    width: "100%",
  },
  missionObjectives: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    whiteSpace: "nowrap",
  },
}));

const marks = [
  {
    value: 10,
    label: "Amateur",
  },
  {
    value: 20,
    label: "Intermediate",
  },
  {
    value: 30,
    label: "Professional",
  },
];

function valuetext(value) {
  return `${value}°C`;
}

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

export const DifficultySlider = ({ handleChange, className }) => {
  const activeCharacter = useSelector(selectActiveCharacter);

  return (
    <div className={className}>
      <Typography id="difficulty-slider" gutterBottom>
        Difficulty
      </Typography>
      <Slider
        onChange={handleChange}
        value={activeCharacter.difficulty}
        getAriaValueText={valuetext}
        aria-labelledby="difficulty-slider"
        step={10}
        valueLabelDisplay="off"
        marks={marks}
        min={10}
        max={30}
      />
    </div>
  );
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

  const handleMapChange = (event) => {
    const map = activeCharacter.maps.find((map) => map.id === event.target.value);
    setMissionMap(map);
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

  const getRandomLoot = () => {
    const junk = randomizeArray(data.items.filter((item) => item.type.id === "junk")).slice(
      0,
      randomNumberInRange(1, data.maxItemLootChances.junk)
    );
    const objectives = randomizeArray(
      data.items.filter((item) => item.type.id === "objectives")
    ).slice(0, randomNumberInRange(0, data.maxItemLootChances.objectives));
    const evidence = randomizeArray(data.items.filter((item) => item.type.id === "evidence")).slice(
      0,
      randomNumberInRange(0, data.maxItemLootChances.evidence)
    );

    return [...junk, ...objectives, ...evidence];
  };

  const handleRandomTrait = () => {
    // Flip a weighted coin to decide if we even get a trait this time
    const acquiredTrait = Math.random() < 0.3;

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
    const randomLoot = getRandomLoot();

    dispatch(addRandomLoot(randomLoot));

    dispatch(
      addAlert({
        severity: "success",
        message: `Found ${randomLoot.length} ${randomLoot.length === 1 ? "item" : "items"}`,
      })
    );
  };

  const calculateMissionPoints = (mission) => {
    const multiplier = mission.difficulty / 10;
    const basePoints = mission.map.type.pointValue;
    let objectivePoints = 0;

    for (const objective in mission.objectives) {
      if (mission.objectives[objective].checked) {
        objectivePoints += mission.objectives[objective].pointValue;
      }
    }

    return (basePoints + objectivePoints) * multiplier;
  };

  const handleUpdateCharacter = () => {
    const mission = {
      difficulty: missionDifficulty,
      map: missionMap,
      objectives: missionObjectives,
    };

    const missionPoints = calculateMissionPoints(mission);
    const totalPoints = missionPoints + activeCharacter.bankedPoints;

    const nextLockedMap = activeCharacter.maps.find((map) => !map.unlocked);

    const updatedCharacter = {
      ...activeCharacter,
      difficulty: missionDifficulty,
      bankedPoints: totalPoints,
      maps: activeCharacter.maps.map((map) => ({
        ...map,
        unlockable: map.id === nextLockedMap.id && totalPoints >= map.pointCost,
      })),
    };

    dispatch(updateCharacter(updatedCharacter));

    dispatch(
      addAlert({
        severity: "success",
        message: `Completed ${missionMap.display} for $${missionPoints}!`,
      })
    );
  };

  const handleMissionComplete = () => {
    // Close the mission log
    dispatch(toggleMissionDrawerOpen());

    // Log the mission outcomes
    handleUpdateCharacter();

    // Randomly acquire 0-1 traits
    handleRandomTrait();

    // Randomly acquire 1-many loot items
    handleRandomLoot();
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
        <Accent size="1.5em" color="accent" transform="uppercase">
          Mission Details
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
            {/* <FormHelperText>Location</FormHelperText> */}
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
            {/* <FormHelperText>Location</FormHelperText> */}
          </FormControl>
        </div>
        <div>
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
