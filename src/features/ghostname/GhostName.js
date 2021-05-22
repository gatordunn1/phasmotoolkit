import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import {
  setFirstname,
  setFirstnames,
  setLastnames,
  setLastname,
  selectFirstnameLetters,
  selectFirstnames,
  selectFirstname,
  selectLastnameLetters,
  selectLastnames,
  selectLastname,
  selectFullname,
  selectViews,
} from "./ghostNameSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#2b2d42",
    display: "flex",
    flexWrap: "nowrap",
    width: "100vw",
    padding: "10px",
    margin: "10px 0 15px 0",
    justifyContent: "center",
    alignItems: "stretch",
  },
  item: {
    borderRadius: "5px",
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.primary.dark,
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
  const firstname = useSelector(selectFirstname);
  const lastnames = useSelector(selectLastnames);
  const lastname = useSelector(selectLastname);
  const fullname = useSelector(selectFullname);
  const views = useSelector(selectViews);

  return (
    <React.Fragment>
      <Paper className={classes.container}>
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
        <div>
          {views.fullname ? (
            <span className={classes.name}>{fullname}</span>
          ) : (
            <React.Fragment>
              <span className={classes.name}>{firstname}</span>
              <span className={classes.name}>{lastname}</span>
            </React.Fragment>
          )}
        </div>
      </Paper>
    </React.Fragment>
  );
}
