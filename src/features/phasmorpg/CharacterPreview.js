import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Xarrow from "react-xarrows";
import CharacterSelect from './CharacterSelect'

import { addAlert } from "../../appSlice";
import { data, Acts } from "./constants";

import {
  deleteCharacter,
  selectActiveCharacter,
  selectMissionDrawerOpen,
  setNextUnlockableMap,
  toggleMissionDrawerOpen,
  unlockMap,
} from "./phasmoRPGSlice";
import LogMission from "./LogMission";
import Readable from "../../common/Readable";
import Equipment from "./Equipment";
import Traits from "./Traits";

const useStyles = makeStyles((theme) => ({
  act: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    gap: theme.spacing(3),
    backgroundColor: theme.palette.background.papercontrast,
    height: "100%",
    borderRadius: "5px",
    padding: theme.spacing(1),
  },
  actsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
  actTitle: {
    fontSize: "1.2em",
    textTransform: "uppercase",
  },
  bankedPoints: {
    color: theme.palette.success.main,
  },
  characterIcons: {
    display: "flex",
    gap: theme.spacing(1.5),
  },
  characterSheetHeader: {
    alignContent: "center",
    color: theme.palette.secondary.light,
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(1.5),
    justifyContent: "center",
    justifyItems: "center",
  },
  characterMoney: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1.5),
  },
  characterPanel: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2, 1, 2, 1),
    margin: theme.spacing(1, 0, 1, 0),
  },
  characterProperties: {
    display: "grid",
    gap: theme.spacing(1.5),
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
    },
    margin: theme.spacing(1, 0, 1.5, 0),
  },
  characterTraitsTitle: {
    backgroundColor: theme.palette.background.paperalt,
    color: theme.palette.secondary.light,
  },
  characterTraitsDetails: {
    fontSize: "0.6em",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "flex-start",
    textAlign: "left",
  },
  firstMap: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.accent,
  },
  mapArrow: {
    zIndex: 999,
  },
  firstMapArrow: {
    color: theme.palette.text.accent,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 115,
  },
  mapIcon: {
    margin: 0,
    padding: 0,
    marginTop: theme.spacing(1),
  },
  mapLocked: {
    color: theme.palette.error.dark,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.error.light,
    },
  },
  mapButton: {
    border: "2px solid transparent",
    fontFamily: "Indie Flower; cursive",
    fontSize: "0.9em",
    display: "grid",
    justifyContent: "stretch",
    gridTemplateColumns: "1fr",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.6em",
    },
  },
  mapButtonUnlocked: {
    backgroundColor: theme.palette.success.dark,
  },
  mapButtonLocked: {
    backgroundColor: `${theme.palette.background.default} !important`,
    color: theme.palette.error.dark,
  },
  mapButtonUnlockable: {
    border: `2px solid ${theme.palette.success.main}`,
    "&:hover": {
      backgroundColor: `${theme.palette.background.paper} !important`,
    },
  },
  mapName: {
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    gap: theme.spacing(1),
    padding: theme.spacing(0.5),
    justifyContent: "space-between",
    border: "2px solid transparent",
    borderRadius: "5px",
  },
  mapTile: {
    margin: theme.spacing(0.5),
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(1),
    },
  },
  mapUnlocked: {
    color: theme.palette.success.light,
  },
  mapWidget: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.disabled,
  },
  characterButtons: {
    display: "flex",
    gap: theme.spacing(1.5),
    justifyContent: "center",
    margin: theme.spacing(1.5),
  },
  deleteCharacter: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(1),
    color: theme.palette.error.dark,
    "&:hover": {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.error.main,
    },
  },
  root: {
    margin: theme.spacing(1, 0, 0, 0),
    width: "95vw",
  },
  removeTrait: {
    color: theme.palette.error.main,
  },
  logMission: {
    fontSize: "0.8em",
    color: theme.palette.text.accent,
    padding: 0,
    margin: 0,
  },
}));

const CharacterButtons = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const missionDrawerOpen = useSelector(selectMissionDrawerOpen);
  const character = useSelector(selectActiveCharacter);

  return (
    Object.keys(character).length > 0 && (
      <React.Fragment>
        <div className={classes.characterButtons}>
          <React.Fragment>
            <Button
              className={classes.logMission}
              onClick={() => dispatch(toggleMissionDrawerOpen())}
            >
              Log Mission
            </Button>
          </React.Fragment>
        </div>
        <Drawer
          anchor={"right"}
          open={missionDrawerOpen}
          onClose={() => dispatch(toggleMissionDrawerOpen())}
        >
          <LogMission character={character} />
        </Drawer>
      </React.Fragment>
    )
  );
};

export default function CharacterPreview() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const character = useSelector(selectActiveCharacter);
  const [actsByMap, setActsByMap] = React.useState();

  React.useEffect(() => {
    if (character) {
      const actsByMap = {
        act1: character.maps.filter((m) => m.act === "act1"),
        act2: character.maps.filter((m) => m.act === "act2"),
        act3: character.maps.filter((m) => m.act === "act3"),
      };
      setActsByMap(actsByMap);
    }
  }, [character]);

  const mapRefs = {
    tanglewood: React.useRef(null),
    ridgeview: React.useRef(null),
    edgefield: React.useRef(null),
    bleasdale: React.useRef(null),
    grafton: React.useRef(null),
    brownstone: React.useRef(null),
    prison: React.useRef(null),
    asylum: React.useRef(null),
  };

  const handleUnlockAttempt = (map) => {
    dispatch(unlockMap(map.id));
    dispatch(setNextUnlockableMap());

    dispatch(
      addAlert({
        severity: "success",
        message: `Unlocked Map: ${map.display}`,
      })
    );
    dispatch(
      addAlert({
        severity: "error",
        message: `Lost: $${map.pointCost}`,
      })
    );
  };

  return actsByMap && character ? (
    <Paper elevation={3} className={clsx(classes.root, classes.characterPanel)} component="div">
      <div className={classes.characterSheetHeader}>
        <div className={classes.characterIcons}>
        <span>
          <CharacterSelect />
        </span>
          <Readable className={classes.characterMoney}>
            <span className={classes.bankedPoints}>${character.bankedPoints}</span>
          </Readable>
        </div>
      </div>
      <CharacterButtons />
      <span className={classes.characterProperties}>
        <Equipment />
        <Traits />
      </span>
      <div className={classes.actsContainer}>
        {Acts.map((act) => (
          <Paper key={`level_${act.id}`} className={classes.act}>
            <Readable className={classes.actTitle}>{act.display}</Readable>
            {actsByMap[act.id].map((map, index) => {
              const nextIndex = index + 1 === actsByMap[act.id].length ? null : index + 1;
              return (
                <Paper
                  key={map.id}
                  component={({ children }) => (
                    <Button
                      onClick={() => handleUnlockAttempt(map)}
                      disabled={map.unlocked || !map.unlockable}
                      className={clsx(classes.mapButton, {
                        [classes.mapButtonLocked]: !map.unlocked,
                        [classes.mapButtonUnlocked]: map.unlocked,
                        [classes.mapButtonUnlockable]: map.unlockable,
                      })}
                      variant="contained"
                    >
                      {children}
                    </Button>
                  )}
                >
                  <span>
                    <span ref={mapRefs[map.id]} className={classes.mapName}>
                      {map.unlocked ? (
                        <LockOpenIcon className={classes.mapUnlocked} />
                      ) : (
                        <LockIcon />
                      )}
                      {map.display} {!map.unlocked && <Readable>-${map.pointCost}</Readable>}
                      <span className={classes.mapIcon}>{data.iconMapMap[map.id]}</span>
                    </span>
                    {nextIndex && (
                      <Xarrow
                        startAnchor="bottom"
                        endAnchor="top"
                        start={mapRefs[map.id]}
                        end={mapRefs[actsByMap[act.id][nextIndex].id]}
                        color={map.unlocked ? "orange" : "grey"}
                        className={clsx(classes.mapArrow, {
                          [classes.firstMapArrow]: map.unlocked,
                        })}
                      />
                    )}
                  </span>
                </Paper>
              );
            })}
          </Paper>
        ))}
      </div>
      <Button
        className={classes.deleteCharacter}
        onClick={() => dispatch(deleteCharacter(character))}
      >
        Delete Character
      </Button>
    </Paper>
  ) : null;
}
