import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "boring-avatars";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";

import {
  selectActiveCharacter,
  selectCharacters,
  setCharacterActive,
} from "../phasmorpg/phasmoRPGSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    alignSelf: "center",
  },
  renderedAvatar: {
    alignSelf: "center",
    margin: "0 5px 0 0",
    position: "absolute",
    left: 0,
    top: 0,
  },
  characterName: {
    color: theme.palette.secondary.light,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "180px",
    [theme.breakpoints.up("md")]: {
      minWidth: "300px",
    },
  },
  formControl: {
    minWidth: "250px",
    [theme.breakpoints.up("md")]: {
      minWidth: "350px",
    },
    alignSelf: "center",
    "& > div > div": {
      display: "grid",
      gridTemplateColumns: "25px 1fr",
      gap: theme.spacing(2),
    },
  },
  menuItem: {
    display: "grid",
    gridTemplateColumns: "25px 1fr",
    gap: theme.spacing(2),
  },
  renderedMenuItem: {
    display: "grid",
    gridTemplateColumns: "25px 1fr",
    gap: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
}));

export default function CharacterSelect() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const activeCharacter = useSelector(selectActiveCharacter);

  const handleCharacterSelect = (event) => {
    const character = event.target.value;
    dispatch(setCharacterActive(character || null));
  };

  const getCharacterById = (characterId) =>
    characters.find((character) => character.id === characterId);

  return (
    characters &&
    characters.length > 0 && (
      <FormControl className={classes.formControl}>
        <Select
          labelId="character-select-label"
          id="character-select"
          value={(activeCharacter && activeCharacter.id) || "AddNew"}
          onChange={handleCharacterSelect}
          label="Character Select"
          disableUnderline
          inputProps={{
            classes: { select: classes.select },
          }}
          renderValue={(characterId) => {
            const character = getCharacterById(characterId);
            return (
              <span className={classes.renderedMenuItem} value={character.id}>
                <span>
                  <Avatar
                    key={`key_${character.name}`}
                    name={character.name}
                    variant="beam"
                    size="30px"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    className={classes.renderedAvatar}
                  />
                </span>
                <span className={classes.characterName}>{character.name}</span>
              </span>
            );
          }}
        >
          {characters.map((character) => (
            <MenuItem key={character.id} className={classes.menuItem} value={character.id}>
              <span>
                <Avatar
                  key={`key_${character.name}`}
                  name={character.name}
                  variant="beam"
                  size="25px"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  className={classes.avatar}
                />
              </span>
              <span className={classes.characterName}>{character.name}</span>
            </MenuItem>
          ))}
          <MenuItem className={classes.menuItem} value="AddNew">
            Add New
          </MenuItem>
        </Select>
      </FormControl>
    )
  );
}
