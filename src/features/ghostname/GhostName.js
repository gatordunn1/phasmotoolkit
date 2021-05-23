import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import React from "react";

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
  selectViews,
} from "./ghostNameSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "transparent",
    display: "flex",
    flexWrap: "nowrap",
    width: "100vw",
    padding: "10px",
    margin: "0 0 15px 0",
    justifyContent: "center",
  },
  instructions: {
    alignSelf: "center",
    margin: "0",
    padding: 0,
    color: theme.palette.text.primary,
    width: '100vw',
  },
  item: {
    borderRadius: "5px",
    cursor: "pointer",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.background.paper,
    },
    width: "100%",
  },
  name: {
    fontSize: "1.4rem",
  },
}));

export default function GhostName({ ghost, handleClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firstnameLetters = useSelector(selectFirstnameLetters);
  const lastnameLetters = useSelector(selectLastnameLetters);
  const firstnames = useSelector(selectFirstnames);
  const lastnames = useSelector(selectLastnames);
  const isVisible = useSelector(selectIsVisible);
  const instructions = useSelector(selectInstructions);
  const views = useSelector(selectViews);

  return isVisible ? (
    <React.Fragment>
      <Paper square elevation={0} className={classes.instructions}>{instructions}</Paper>
      <div className={classes.container}>
        {views.firstnameLetters &&
          firstnameLetters.map((letter) => (
            <span
              key={`firstnameLetter_${letter}`}
              onClick={() => dispatch(setFirstnames(letter))}
              className={classes.item}
            >
              {letter}
            </span>
          ))}
        {views.firstnames &&
          firstnames.map((firstname) => (
            <span
              key={firstname}
              onClick={() => dispatch(setFirstname(firstname))}
              className={classes.item}
            >
              {firstname}
            </span>
          ))}
        {views.lastnameLetters &&
          lastnameLetters.map((letter) => (
            <span
              key={`lastnameLetter_${letter}`}
              onClick={() => dispatch(setLastnames(letter))}
              className={classes.item}
            >
              {letter}
            </span>
          ))}
        {views.lastnames &&
          lastnames.map((lastname) => (
            <span
              key={lastname}
              onClick={() => dispatch(setLastname(lastname))}
              className={classes.item}
            >
              {lastname}
            </span>
          ))}
      </div>
    </React.Fragment>
  ) : null;
}
