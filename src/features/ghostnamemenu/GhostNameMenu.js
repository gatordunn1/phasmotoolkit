import { makeStyles } from "@material-ui/core/styles";
import { mdiGhost } from "@mdi/js";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Icon from "@mdi/react";
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Readable from "../../common/Readable";

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
    margin: 0,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
    },
  },
  button: {
    margin: theme.spacing(1, 0, 0, 0),
    color: theme.palette.text.primary,
    "&:hover": {
      background: "none",
      color: theme.palette.text.accent,
    },
  },
  cancelButton: {
    color: theme.palette.error.main,
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
    width: "300px",
    color: theme.palette.text.primary,
  },
  itemList: {
    display: "flex",
    cursor: "pointer",
  },
  letterList: {
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: "1.5em",
    "& > span": {
      width: "25%",
      "&:hover": {
        color: theme.palette.action.hover,
      },
    },
  },
  nameList: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "1.5em",
    "& > span": {
      width: "100%",
      "&:hover": {
        color: theme.palette.action.hover,
      },
    },
  },
  container: {
    backgroundColor: "transparent",
    display: "flex",
    flexWrap: "wrap",
    padding: "10px",
    margin: "0 0 15px 0",
    justifyContent: "center",
    userSelect: "none",
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
  const screenExtraSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const list = ({ anchor = "right", data, keyName, onClick, letters }) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
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
          <span key={`${keyName}_${item}`} onClick={() => onClick(item)}>
            {item}
          </span>
        ))}
      </div>
      <Button
        variant="text"
        className={classes.cancelButton}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          variant="text"
          color="primary"
          className={classes.button}
          startIcon={<Icon aria-hidden={true} path={mdiGhost} title="Ghost Name" size={1} />}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <Readable>{screenExtraSmall ? "Name" : "Set Name"}</Readable>
        </Button>
        {isVisible && (
          <Drawer anchor={"left"} open={drawerOpen} variant="persistent">
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
