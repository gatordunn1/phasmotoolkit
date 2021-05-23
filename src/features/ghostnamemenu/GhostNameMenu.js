import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import React from "react";
import { mdiGhost } from "@mdi/js";
import Icon from "@mdi/react";

import {
  setFirstname,
  setFirstnames,
  setLastnames,
  setLastname,
  selectFirstnameLetters,
  selectFirstnames,
  selectLastnameLetters,
  selectLastnames,
  selectIsVisible,
  selectInstructions,
  selectViews as selectGhostNameViews,
} from "../ghostname/ghostNameSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 15px 0",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
    },
  },
  button: {
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
    "&:hover": {
      background: "transparent",
      color: theme.palette.text.secondary,
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
  reset: {
    margin: 0,
    alignSelf: "center",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
    },
  },
  list: {
    width: "250px",
    color: theme.palette.text.primary,
  },
  itemList: {
    display: "flex",
    cursor: "pointer",
  },
  letterList: {
    flexWrap: "wrap",
    justifyContent: "center",
    "& > span": {
      width: "2.0em",
    },
  },
  nameList: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    "& > span": {
      width: "100%",
    },
  },
  fullList: {
    // width: "auto",
  },
  container: {
    backgroundColor: "transparent",
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    margin: "0 0 15px 0",
    justifyContent: "center",
  },
  instructions: {
    alignSelf: "center",
    margin: "0",
    padding: 0,
    color: theme.palette.text.primary,
  },
  item: {
    borderRadius: "5px",
    cursor: "pointer",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.background.paper,
    },
    // width: "100%",
  },
  name: {
    fontSize: "1.4rem",
  },
}));

export default function GhostNameMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firstnameLetters = useSelector(selectFirstnameLetters);
  const lastnameLetters = useSelector(selectLastnameLetters);
  const firstnames = useSelector(selectFirstnames);
  const lastnames = useSelector(selectLastnames);
  const isVisible = useSelector(selectIsVisible);
  const instructions = useSelector(selectInstructions);
  const ghostNameViews = useSelector(selectGhostNameViews);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = ({ anchor = "right", data, keyName, onClick, letters }) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.label}>{instructions}</div>
      <Divider />
      <div
        className={clsx(classes.itemList, {
          [classes.letterList]: letters,
          [classes.nameList]: !letters,
        })}
      >
        {data.map((item) => (
          // <ListItem button key={`${keyName}_${item}`} onClick={() => onClick(item)}>
          //   <ListItemText primary={item} />
          // </ListItem>
          <span key={`${keyName}_${item}`} onClick={() => onClick(item)}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          variant="text"
          color="primary"
          className={classes.button}
          startIcon={
            <Icon path={mdiGhost} title="Ghost Name" size={1} horizontal vertical rotate={180} />
          }
          onClick={toggleDrawer("left", true)}
        >
          Set Name
        </Button>
        {isVisible && (
          <Drawer anchor={"left"} open={state["left"]} variant="persistent">
            <div className={classes.container}>
              {ghostNameViews.firstnameLetters &&
                list({
                  keyName: "firstnameLetters",
                  data: firstnameLetters,
                  onClick: (x) => dispatch(setFirstnames(x)),
                  letters: true,
                })}
              {ghostNameViews.firstnames &&
                list({
                  keyName: "firstnames",
                  data: firstnames,
                  onClick: (x) => dispatch(setFirstname(x)),
                })}
              {ghostNameViews.lastnameLetters &&
                list({
                  keyName: "lastnameLetters",
                  data: lastnameLetters,
                  onClick: (x) => dispatch(setLastnames(x)),
                  letters: true,
                })}
              {ghostNameViews.lastnames &&
                list({
                  keyName: "lastnames",
                  data: lastnames,
                  onClick: (x) => dispatch(setLastname(x)),
                })}
            </div>
          </Drawer>
        )}
      </React.Fragment>
    </div>
  );
}
