import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import MenuIcon from "@material-ui/icons/Menu";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import WorkIcon from "@material-ui/icons/Work";
import { mdiMagnifyClose } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { resetApp, selectLanguage, selectViews, setLanguage, toggleModule } from "../../appSlice";
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";
import { LOCAL_STORAGE_KEY } from "../../constants";
import { resetEvidence, selectIsPristine } from "../evidence/evidenceSlice";
import { resetGhostName } from "../ghostname/ghostNameSlice";
import { reset as resetPhasmoRPG } from "../phasmorpg/phasmoRPGSlice";
import { reset as resetPhotoCalculator } from "../photocalculator/photoCalculatorSlice";
import { reset as resetChallenges } from "../randomizers/challenges/challengeRandomizerSlice";
import { reset as resetJobRandomizer } from "../randomizers/jobrandomizer/jobRandomizerSlice";

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
  languages: {
    fontFamily: "'Roboto', sans-serif !important",
    margin: "5px 10px",
    "& div.ls__control": {
      cursor: "pointer",
      backgroundColor: theme.palette.background.paper,
      boxShadow: "none",
      // border: `1px solid ${theme.palette.text.primary}`,
    },
    "& div.ls__control:hover": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: "none",
      // border: `1px solid ${theme.palette.text.accent}`,
    },
    "& div.ls__single-value": {
      color: `${theme.palette.text.accent} !important`,
    },
    "& div.ls__menu": {
      backgroundColor: theme.palette.background.paper,
    },
    "& div.ls__option": {
      backgroundColor: theme.palette.background.paper,
      color: `${theme.palette.text.accent} !important`,
    },
    "& div.ls__option:hover": {
      backgroundColor: theme.palette.background.paperalt,
      color: `${theme.palette.text.accent} !important`,
    },
  },
  languagesContainer: {
    backgroundColor: theme.palette.background.paperalt,
    display: "flex",
    flexDirection: "column",
    margin: "0px 0px 5px 0px",
    padding: "5px 0px 10px 0px",
    borderTop: `2px solid ${theme.palette.action.hover}`,
    borderBottom: `2px solid ${theme.palette.action.hover}`,
  },
  languagesHeader: {
    justifyContent: "center",
    display: "flex",
    padding: "5px",
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
    // fontSize: "1.2em",
  },
  menuToggleItems: {
    margin: "0px",
    padding: "0px",
  },
  list: {
    margin: "0px",
    whiteSpace: "nowrap",
    color: theme.palette.text.primary,
    minWidth: "calc(100vw / 4)",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100vw",
    },
  },
  fullList: {
    width: "auto",
  },
}));

export default function SiteMenu() {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
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
        i18nKey: "labels.evidence",
        onClick: () => dispatch(toggleModule("evidence")),
        icon: <SearchIcon />,
      },
      {
        id: "ghosts",
        i18nKey: "labels.ghosts",
        onClick: () => dispatch(toggleModule("ghosts")),
        icon: <MoodBadIcon />,
      },
      {
        id: "challenges",
        i18nKey: "labels.challenges",
        onClick: () => dispatch(toggleModule("challenges")),
        icon: <SportsKabaddiIcon />,
      },
      {
        id: "jobs",
        i18nKey: "labels.jobs",
        onClick: () => dispatch(toggleModule("jobs")),
        icon: <WorkIcon />,
      },
      {
        id: "photocalculator",
        i18nKey: "labels.photocalculator.short",
        onClick: () => dispatch(toggleModule("photocalculator")),
        icon: <PhotoCameraIcon />,
      },
    ],
    [dispatch]
  );

  const menuActionItems = [
    {
      id: "resetapp",
      onClick: () => reset(),
      icon: <ReplayIcon />,
    },
    {
      id: "close",
      onClick: () => setState({ ...state, right: false }),
      icon: <CloseIcon />,
    },
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  const onSelectChange = (e) => {
    dispatch(setLanguage(e.value));
    i18n.changeLanguage(e.value);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.label}>
        <Accent color="accent">{t("apps.toolkit.name.short")}</Accent>
      </div>
      <Divider />
      {!views.phasmorpg && (
        <List className={classes.menuToggleItems}>
          {menuToggleItems.map((item) => (
            <ListItem
              className={clsx({ [classes.disabled]: !views[item.id] })}
              button
              key={item.id}
              onClick={item.onClick}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={<Readable className={classes.menuItem}>{t(item.i18nKey)}</Readable>}
              />
              <Switch
                checked={views[item.id]}
                name={item.id}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </ListItem>
          ))}
        </List>
      )}
      <List className={classes.menuToggleItems}>
        <span className={classes.languagesContainer}>
          <Accent className={classes.languagesHeader} color="accent" size="1.3em">
            <Readable>{t("labels.chooselanguage")}</Readable>
          </Accent>
          <Select
            id="language-select"
            name="language-select"
            className={classes.languages}
            classNamePrefix="ls"
            defaultValue={languageOptions.find((l) => l.value === language)}
            onChange={onSelectChange}
            options={languageOptions}
          />
        </span>
        {menuActionItems.map((item) => (
          <ListItem button key={item.id} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={<Readable className={classes.menuItem}>{t(`labels.${item.id}`)}</Readable>}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      {views.evidence && (
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
      )}
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
