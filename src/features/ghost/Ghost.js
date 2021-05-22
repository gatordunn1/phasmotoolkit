import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import { selectSelected } from "../ghosts/ghostsSlice";
import { iconMap, selectIncluded } from "../evidence/evidenceSlice";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: "#33415c",
  },
  ghost: {
    padding: "0 5px",
    margin: "5px 5px",
    fontSize: "1.2rem",
    color: "#eb5e28",
  },
  included: {
    color: `${theme.palette.success.main} !important`,
  },
  invalid: {
    color: theme.palette.text.disabled,
  },
  paper: {
    backgroundColor: "#3c1642",
    border: "2px solid transparent",
    cursor: "pointer",
    minWidth: "125px",
    padding: "5px",
    display: "inline-block",
    margin: "10px",
    "&:hover": {
      border: "2px solid lightgrey",
    },
  },
  paperInvalid: {
    backgroundColor: "#5c677d",
  },
  paperValid: {
    backgroundColor: theme.palette.primary.dark,
  },
  selected: {
    color: `${theme.palette.secondary.light} !important`,
  },
  valid: {
    color: theme.palette.text.primary,
  },
}));

export default function Ghost({ ghost, handleClick }) {
  const classes = useStyles();
  const included = useSelector(selectIncluded);
  const selected = useSelector(selectSelected);

  const evidenceIsIncluded = React.useCallback(
    (ev) => included.some((i) => i.id === ev),
    [included]
  );

  const isSelected = React.useMemo(() => selected && selected.name === ghost.name, [selected, ghost.name]);
  return (
    <Paper
      className={classNames(classes.paper, ghost.included ? classes.paperValid : classes.paperInvalid)}
      onClick={() => handleClick(ghost)}
    >
      <div
        className={classNames(classes.ghost, ghost.included ? classes.valid : classes.invalid, {
          [classes.selected]: isSelected,
        })}
      >
        {ghost.name}
      </div>
      <div className={classes.icons}>
        {ghost.evidence.map((ev) => (
          <span key={ev} className={evidenceIsIncluded(ev) ? classes.included : ""} title={ev}>
            {iconMap(ev)}
          </span>
        ))}
      </div>
    </Paper>
  );
}
