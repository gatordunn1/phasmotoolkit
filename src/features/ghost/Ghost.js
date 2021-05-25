import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import classNames from "classnames";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { iconMap, selectIncluded } from "../evidence/evidenceSlice";
import { selectSelected } from "../ghosts/ghostsSlice";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: "#33415c",
  },
  ghost: {
    margin: "5px 5px",
    fontSize: "1.2rem",
  },
  iconsValid: {
    color: theme.palette.text.secondary,
  },
  iconsInvalid: {
    color: theme.palette.text.disabled,
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
    padding: "5px",
    "&:hover": {
      border: "2px solid lightgrey",
    },
  },
  paperInvalid: {
    backgroundColor: theme.palette.ghosts.invalid,
  },
  paperValid: {
    backgroundColor: theme.palette.ghosts.valid,
  },
  selected: {
    color: `${theme.palette.info.main} !important`,
  },
  valid: {
    color: theme.palette.text.secondary,
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
      <div className={ghost.included ? classes.iconsValid : classes.iconsInvalid}>
        {ghost.evidence.map((ev) => (
          <span key={ev} className={evidenceIsIncluded(ev) ? classes.included : ""} title={ev}>
            {iconMap(ev)}
          </span>
        ))}
      </div>
    </Paper>
  );
}
