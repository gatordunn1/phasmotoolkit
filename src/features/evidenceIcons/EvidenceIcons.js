import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectGhosts, selectSelected } from "./ghostsSlice";
import { iconMap, selectExcluded, selectIncluded } from "../evidence/evidenceSlice";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Ghost from "../ghost/Ghost";

const useStyles = makeStyles((theme) => ({
  ghost: {
    padding: "0 5px",
    margin: "5px 5px",
  },
  icons: {
    // width: '200px',
  },
  included: {
    color: `${theme.palette.success.dark} !important`,
  },
  invalid: {
    color: theme.palette.error.dark,
  },
  paper: {
    border: "2px solid transparent",
    cursor: "pointer",
    // width: "100px",
    // minWidth: "150px",
    // maxWidth: "100px",
    padding: "10px",
    display: "inline-block",
    margin: "10px",
    "&:hover": {
      border: "2px solid lightgrey",
    },
  },
  valid: {
    color: theme.palette.success.dark,
  },
}));

export default function EvidenceIcons() {
  const classes = useStyles();
  const included = useSelector(selectIncluded);
  return (
    <span className={classes.ghostIcons}>
      {selectedGhost.evidence.map((ev) => (
        <span key={ev} className={evidenceIsIncluded(ev) ? classes.included : ""} title={ev}>
          {iconMap(ev)}
        </span>
      ))}
    </span>
  );
}
