import { debounce } from "lodash-es";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Avatar from "boring-avatars";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TextField from "@material-ui/core/TextField";

import { data } from "./constants";

import {
  selectActiveCharacter,
  selectCharacters,
  setCharacterActive,
  saveCharacter,
} from "./phasmoRPGSlice";
import CharacterPreview from "./CharacterPreview";

const useStyles = makeStyles((theme) => ({
  avatar: {},
  characterCreator: {
    display: "grid",
    gridTemplateColumns: "1fr",
  },
  createCharacter: {
    width: 200,
    justifySelf: "center",
  },
  cancelButton: {
    color: theme.palette.error.main,
  },
  existingCharacters: {
    display: "flex",
    gap: theme.spacing(1),
    justifyContent: "center",
    padding: theme.spacing(2),
    width: "95vw",
    borderRadius: "5px",
    alignContent: "center",
    "& > .existingCharacterButton": {
      padding: 0,
      margin: 0,
    },
  },
  isActive: {
    border: `2px solid ${theme.palette.text.accent} !important`,
  },
  existingCharacterTile: {
    backgroundColor: theme.palette.background.papercontrast,
    border: "2px solid transparent",
    padding: theme.spacing(2),
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.palette.background.paperalt,
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: theme.palette.background.default,
      cursor: "pointer",
    },
  },
  newCharacter: {
    [theme.breakpoints.up("md")]: {
      width: "50vw",
    },
    borderRadius: "5px",
    justifySelf: "center",
    padding: "20px",
    width: "350px",
  },
  root: {
    margin: theme.spacing(0, 1, 0, 1),
  },
}));

const randomize = (array) => array.sort(() => Math.random() - 0.5);

const getRandomChunkFromRange = (start, end, splitBy) => {
  const range = end - start;
  const chunkCount = Math.floor(range / splitBy);
  const chunkSize = range / chunkCount;

  let chunks = [start];
  for (let i = 0; i < chunkCount; i++) {
    chunks = [...chunks, chunkSize + chunks[chunks.length - 1]];
  }

  return chunks.sort(() => Math.random() - 0.5)[0];
};

const CreateCharacter = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const [characterName, setCharacterName] = React.useState("");

  const handleKeyUp = debounce((e) => {
    if (e.code === "Enter") {
      handleClick();
    } else {
      setCharacterName(e.target.value.trim());
    }
  }, 100);

  const handleClick = () => {
    if (characterName.length > 0) {
      const starterItems = data.items.filter((item) => item.category.id === "starter");

      const items = [...starterItems];
      const traits = [...data.traits];

      const randomItems = randomize(items).slice(0, 2);
      const randomTraits = randomize(traits).slice(0, 1);

      const actRangeMap = {
        act1: [1000, 2500],
        act2: [2500, 4000],
        act3: [4000, 5500],
      };

      let maps = data.maps
        .map((map) => ({
          ...map,
          pointCost: getRandomChunkFromRange(actRangeMap[map.act][0], actRangeMap[map.act][1], 250),
        }))
        .sort((a, b) => {
          return a.pointCost - b.pointCost;
        });

      // Unlock the first map
      maps[0] = {
        ...maps[0],
        unlocked: true,
      };

      dispatch(
        saveCharacter({
          money: 0,
          items: randomItems,
          traits: randomTraits,
          maps,
          difficulty: 30,
          name: characterName,
        })
      );
    }
  };

  return (
    <div className={classes.characterCreator}>
      <TextField
        autoFocus={true}
        className={classes.newCharacter}
        id="filled-basic"
        margin="dense"
        helperText="New Character Name"
        variant="standard"
        onKeyUp={handleKeyUp}
      />
      <span>
        <Button className={classes.createCharacter} onClick={() => handleClick()}>
          Create Character
        </Button>
        {characters.length > 0 && (
          <Button
            className={classes.cancelButton}
            onClick={() => dispatch(setCharacterActive(characters[0].id))}
          >
            Cancel
          </Button>
        )}
      </span>
      <CharacterPreview />
    </div>
  );
};

export const CharacterButton = ({ character }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Set a character active or set none which shows the add new character input
  const handleClick = () => dispatch(setCharacterActive((character && character.id) || null));

  return (
    <Button className="existingCharacterButton" onClick={() => handleClick()}>
      {character ? (
        <Paper
          title={character.name}
          className={clsx(classes.existingCharacterTile, {
            [classes.isActive]: character.isActive,
          })}
          component="span"
        >
          <Avatar
            key={`key_${character.name}`}
            name={character.name}
            variant="beam"
            size="25px"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            className={classes.avatar}
          />
        </Paper>
      ) : (
        <Paper title="Add New Character" className={classes.existingCharacterTile} component="span">
          <AddBoxIcon />
        </Paper>
      )}
    </Button>
  );
};

export default function PhasmoRPG() {
  const classes = useStyles();
  const activeCharacter = useSelector(selectActiveCharacter);

  return (
    <div className={classes.root}>
      {activeCharacter ? <CharacterPreview /> : <CreateCharacter />}
    </div>
  );
}
