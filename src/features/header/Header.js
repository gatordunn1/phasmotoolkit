import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import BuildIcon from "@material-ui/icons/Build";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import React from "react";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTranslation } from "react-i18next";

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
import { selectHasActiveCharacter, toggleMissionDrawerOpen } from "../phasmorpg/phasmoRPGSlice";

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
    gridTemplateColumns: "1fr auto 1fr",
    margin: theme.spacing(0, 0, 0.5, 0),
    width: "100vw",
    maxHeight: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
      textAlign: "left",
    },
  },
  containerRPG: {
    fontSize: "1.0em",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyContent: "space-between",
    margin: theme.spacing(0, 0, 0.5, 0),
    width: "100vw",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
      textAlign: "left",
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
  logMission: {
    padding: theme.spacing(0, 1, 0, 1),
    margin: 0,
    color: theme.palette.text.accent,
  },
  logShort: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  logLong: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
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
  menu: {
    justifySelf: "flex-end",
    paddingRight: theme.spacing(2),
  },
  appName: {
    minWidth: "165px",
    justifySelf: "flex-start",
  },
  buttonBar: {
    justifySelf: "center",
  },
}));

export default function Header() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const firstname = useSelector(selectFirstname);
  const lastname = useSelector(selectLastname);
  const isVisible = useSelector(selectIsVisible);
  const views = useSelector(selectViews);
  const hasActiveCharacter = useSelector(selectHasActiveCharacter);
  const screenExtraSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const handleTogglePhasmoRPG = () => {
    dispatch(togglePhasmoRPG());
  };

  return (
    <Paper
      square
      className={clsx({
        [classes.container]: !views.phasmorpg,
        [classes.containerRPG]: views.phasmorpg,
      })}
      component="h1"
    >
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
              {t('apps.rpg.name')}
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
              <BuildIcon />
            </IconButton>
            <Accent size="0.8em" color="primary">
              {screenExtraSmall ? t('apps.toolkit.name.short') : t('apps.toolkit.name.long')}
            </Accent>
          </React.Fragment>
        )}
      </span>
      <span className={classes.buttonBar}>
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
        {views.phasmorpg && hasActiveCharacter && (
          <Button
            className={classes.logMission}
            onClick={() => dispatch(toggleMissionDrawerOpen())}
            variant="outlined"
          >
            <span className={classes.logShort}>Log</span>
            <span className={classes.logLong}>Log Mission</span>
          </Button>
        )}
      </span>
      <span className={classes.menu}>
        <SiteMenu />
      </span>
    </Paper>
  );
}
