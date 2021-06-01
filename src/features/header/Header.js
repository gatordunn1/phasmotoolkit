import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import React from "react";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  selectFirstname,
  selectLastname,
  selectIsVisible,
  resetGhostName,
} from "../ghostname/ghostNameSlice";
import GhostNameMenu from "../ghostnamemenu/GhostNameMenu";
import SiteMenu from "../sitemenu/SiteMenu";
import Readable from "../../common/Readable";
import Accent from "../../common/Accent";
import { selectViews, togglePhasmoRPG } from "../../appSlice";
import IconButton from "../../common/IconButton";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.error.dark,
    },
  },
  toggleAppButton: {
    color: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.light,
    },
  },
  container: {
    fontSize: "1.0em",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    margin: theme.spacing(0, 0, 0.5, 0),
    width: "100vw",
    maxHeight: theme.spacing(8),
    padding: theme.spacing(0.5, 0, 0.5, 0),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
    },
  },
  ghostname: {
    borderRadius: "5px",
    display: "flex",
    alignContent: "center",
    cursor: "pointer",
    margin: 0,
    backgroundColor: theme.palette.info.dark,
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  icon: {
    float: "right",
    alignSelf: "center",
  },
  menu: {
    justifySelf: "flex-end",
    paddingRight: theme.spacing(2),
  },
  reset: {
    marginLeft: "10px",
  },
  title: {
    fontFamily: "Indie Flower !important",
    justifySelf: "flex-start",
    color: theme.palette.text.accent,
    "& > span": {
      fontSize: "0.6em",
      color: theme.palette.text.disabled,
    },
  },
  appName: {
    minWidth: "165px",
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
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firstname = useSelector(selectFirstname);
  const lastname = useSelector(selectLastname);
  const isVisible = useSelector(selectIsVisible);
  const views = useSelector(selectViews);
  const screenExtraSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const handleTogglePhasmoRPG = () => {
    dispatch(togglePhasmoRPG());
  };

  return (
    <Paper square className={classes.container} component="h1">
      <span className={classes.appName}>
        {views.phasmorpg ? (
          <React.Fragment>
            <IconButton
              onClick={() => handleTogglePhasmoRPG()}
              aria-label="Toggle Phasmo RPG"
              title="Toggle Phasmo RPG"
              className={classes.toggleAppButton}
            >
              <SupervisedUserCircleIcon />
            </IconButton>
            <Accent size="0.8em" color="primary">
              Phasmo RPG
            </Accent>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <IconButton
              onClick={() => handleTogglePhasmoRPG()}
              aria-label="Toggle Phasmo RPG"
              title="Toggle Phasmo RPG"
              className={classes.toggleAppButton}
            >
              <SupervisedUserCircleIcon />
            </IconButton>
            <Accent size="0.8em" color="primary">
              {screenExtraSmall ? "PhasmoKit" : "Phasmo Toolkit"}
            </Accent>
          </React.Fragment>
        )}
      </span>
      <React.Fragment>
        {views.evidence && (
          <React.Fragment>
            {!isVisible ? (
              <Button
                variant="text"
                color="primary"
                className={classes.button}
                onClick={() => dispatch(resetGhostName())}
                startIcon={<DeleteIcon />}
              >
                <Readable>
                  {firstname} {lastname}
                </Readable>
              </Button>
            ) : (
              <GhostNameMenu />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
      <span className={classes.menu}>
        <SiteMenu />
      </span>
    </Paper>
  );
}
