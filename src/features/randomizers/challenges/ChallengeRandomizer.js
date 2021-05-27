import { makeStyles } from "@material-ui/core/styles";
import { mdiSlotMachineOutline } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import Icon from "@mdi/react";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";

import ChallengesList from "./ChallengesList";
import Readable from "../../../common/Readable";
import Accent from "../../../common/Accent";

import {
  resetUsed,
  selectChallenges,
  selectRandomizedChallenge,
  setRandomChallenge,
} from "./challengeRandomizerSlice";

const useStyles = makeStyles((theme) => ({
  challengeText: {
    fontSize: "1.2em",
    display: "flex",
    alignContent: "center",
    gap: "10px",
    "&:hover": {
      color: theme.palette.action.hover,
    }
  },
  editOptions: {
    alignSelf: "center",
    "&:hover": {
      color: theme.palette.action.hover,
    },
  },
  icon: {
    alignSelf: "center",
  },
  iconGroup: {
    display: "flex",
    justifySelf: "flex-start",
  },
  iconHover: {
    color: theme.palette.action.hover,
  },
  root: {
    width: "95vw",
    padding: "10px 0 10px 0",
    display: "flex",
  },
  randomizer: {
    cursor: "pointer",
    display: "flex",
    flexWrap: "nowrap",
    paddingLeft: "10px",
    justifyContent: "space-between",
    width: "95%",
  },
  spinner: {
    padding: "0 0 0 10px",
    display: "flex",
    width: "100%",
    alignSelf: "center",
    justifySelf: "center",
    justifyContent: "center",
  },
  randomChallenge: {
    webkitAnimation: "flip-in-hor-bottom 350ms ease-in-out 1 both",
    animation: "flip-in-hor-bottom 350ms ease-in-out 1 both",
  },
  used: {
    color: theme.palette.text.disabled,
  },
}));

export default function ChallengeRandomizer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const challenges = useSelector(selectChallenges);
  const randomized = useSelector(selectRandomizedChallenge);
  const [editOpen, setEditOpen] = React.useState(false);

  const spinTheWheel = React.useCallback(
    (e) => {
      e.stopPropagation();
      const remaining = challenges.filter(
        (challenge) => challenge.enabled && !challenge.used
      ).length;

      dispatch(setRandomChallenge());

      // Allow infinite random cycles
      if (remaining === 1) {
        dispatch(resetUsed());
      }
    },
    [challenges, dispatch]
  );

  const toggleDrawer = (status) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setEditOpen(status);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography component="span" color="textPrimary" className={classes.randomizer}>
          <span className={classes.iconGroup}>
            <EditIcon className={classes.editOptions} onClick={toggleDrawer(true)} />
          </span>
          <span
            className={classes.spinner}
            // onMouseEnter={handleHovering(true)}
            // onMouseLeave={handleHovering(false)}
            onClick={spinTheWheel}
          >
            {randomized && randomized.display ? (
              <span key={randomized.id} className={classes.randomChallenge}>
                <Readable className={classes.challengeText}>
                  <Accent>{randomized.display}</Accent> <div>{randomized.description}</div>
                </Readable>
              </span>
            ) : (
              <Readable className={classes.challengeText}>
                <Icon
                  className={classes.icon}
                  path={mdiSlotMachineOutline}
                  size={1}
                />
                <Accent>Click here for a random challenge!</Accent>
              </Readable>
            )}
          </span>
        </Typography>
      </Paper>
      <Drawer anchor="right" open={editOpen} onClose={toggleDrawer(false)}>
        <ChallengesList />
      </Drawer>
    </React.Fragment>
  );
}
