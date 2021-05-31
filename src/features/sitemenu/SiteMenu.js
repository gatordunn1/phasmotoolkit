import { makeStyles } from "@material-ui/core/styles";
import { mdiMagnifyClose } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import Icon from "@mdi/react";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import Switch from "@material-ui/core/Switch";
import WorkIcon from "@material-ui/icons/Work";

import { LOCAL_STORAGE_KEY } from "../../constants";
import { reset as resetChallenges } from "../randomizers/challenges/challengeRandomizerSlice";
import { reset as resetJobRandomizer } from "../randomizers/jobrandomizer/jobRandomizerSlice";
import { reset as resetPhotoCalculator } from "../photocalculator/photoCalculatorSlice";
import { resetApp, selectThemeName, selectViews, toggleModule, toggleTheme } from "../../appSlice";
import { resetEvidence, selectIsPristine } from "../evidence/evidenceSlice";
import { resetGhostName } from "../ghostname/ghostNameSlice";
import { reset as resetPhasmoRPG } from '../phasmorpg/phasmoRPGSlice';
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > span": {
      alignSelf: "baseline",
      margin: 0,
    },
  },
  clearInactive: {
    color: theme.palette.text.disabled,
    pointerEvents: "none",
  },
  clearActive: {
    color: theme.palette.error.main,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },
  disabled: {
    opacity: 0.25,
  },
  label: {
    fontSize: "1.3rem",
    textAlign: "center",
    padding: "5px 0 10px 0",
  },
  menu: {
    margin: 0,
    alignSelf: "center",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.action.hover,
      backgroundColor: "transparent",
    },
  },
  menuItem: {
    fontSize: "1.2em",
  },
  list: {
    whiteSpace: "nowrap",
    color: theme.palette.text.primary,
  },
  fullList: {
    width: "auto",
  },
}));

export default function SiteMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const themeName = useSelector(selectThemeName);
  const evidenceIsPristine = useSelector(selectIsPristine);
  const views = useSelector(selectViews);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const reset = () => {
    dispatch(resetEvidence());
    dispatch(resetGhostName());
    dispatch(resetApp());
    dispatch(resetChallenges());
    dispatch(resetPhotoCalculator());
    dispatch(resetJobRandomizer());
    dispatch(resetPhasmoRPG());
    setState({ ...state, right: false });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const clearEvidence = () => {
    dispatch(resetEvidence());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuToggleItems = React.useMemo(
    () => [
      {
        id: "evidence",
        display: "Evidence",
        onClick: () => dispatch(toggleModule("evidence")),
        icon: <SearchIcon />,
      },
      {
        id: "ghosts",
        display: "Ghosts",
        onClick: () => dispatch(toggleModule("ghosts")),
        icon: <MoodBadIcon />,
      },
      {
        id: "challenges",
        display: "Challenges",
        onClick: () => dispatch(toggleModule("challenges")),
        icon: <SportsKabaddiIcon />,
      },
      {
        id: "jobs",
        display: "Job Randomizer",
        onClick: () => dispatch(toggleModule("jobs")),
        icon: <WorkIcon />,
      },
      {
        id: "photocalculator",
        display: "Photo Calculator",
        onClick: () => dispatch(toggleModule("photocalculator")),
        icon: <PhotoCameraIcon />,
      },
    ],
    [dispatch]
  );

  const menuActionItems = [
    // {
    //   id: "theme",
    //   display: `${themeName === "dark" ? "Light" : "Dark"} Theme`,
    //   onClick: () => dispatch(toggleTheme()),
    //   icon: <FormatPaintIcon />,
    // },
    {
      id: "reset",
      display: "Reset App",
      onClick: () => reset(),
      icon: <ReplayIcon />,
    },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.label}>
        <Accent>Phasmo Toolkit</Accent>
      </div>
      <Divider />
      <List>
        {menuToggleItems.map((item) => (
          <ListItem
            className={clsx({ [classes.disabled]: !views[item.id] })}
            button
            key={item.id}
            onClick={item.onClick}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Readable className={classes.menuItem}>{item.display}</Readable>}
            />
            <Switch
              checked={views[item.id]}
              name={item.id}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuActionItems.map((item) => (
          <ListItem button key={item.id} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Readable className={classes.menuItem}>{item.display}</Readable>}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <span
        title="Clear Evidence"
        onClick={clearEvidence}
        className={clsx({
          [classes.clearActive]: evidenceIsPristine,
          [classes.clearInactive]: !evidenceIsPristine,
        })}
      >
        <Icon path={mdiMagnifyClose} size={1} />
      </span>
      <IconButton
        className={classes.menu}
        color="default"
        aria-label="side drawer"
        component="span"
        onClick={toggleDrawer("right", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
        {list("right")}
      </Drawer>
    </div>
  );
}
