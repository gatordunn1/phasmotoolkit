import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ReplayIcon from "@material-ui/icons/Replay";

import { resetGhosts } from "../ghosts/ghostsSlice";
import { resetEvidence } from "../evidence/evidenceSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    margin: "10px 0 15px 0",
  },
  reset: {
    '&:hover': {
      color: theme.palette.secondary.light,
      backgroundColor: 'transparent',
    }
  }
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reset = () => {
    dispatch(resetEvidence());
    dispatch(resetGhosts());
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterbottom="true">
        Phasmo Toolkit{" "}
        <IconButton className={classes.reset} color="default" aria-label="reset page" component="span" onClick={reset}>
          <ReplayIcon />
        </IconButton>
      </Typography>
    </div>
  );
}
