import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  cycle,
  iconMap,
  selectEvidence,
  selectIncluded,
  selectExcluded,
} from './evidenceSlice';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    userSelect: 'none',
    width: '95vw',
  },
  icon: {
    float: 'left',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: '3px solid transparent',
    color: theme.palette.text.disabled,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    },
  },
  included: {
    color: `${theme.palette.success.dark}!important`,
    border: `3px solid ${theme.palette.success.dark}`,
  },
  excluded: {
    color: `${theme.palette.error.dark}!important`,
    border: `3px solid ${theme.palette.error.dark}`,
  },
}));

export function Evidence() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const evidence = useSelector(selectEvidence);
  const included = useSelector(selectIncluded);
  const excluded = useSelector(selectExcluded);

  const isIncluded = React.useCallback(
    (e) => included.find((s) => s.id === e.id),
    [included]
  );
  const isExcluded = React.useCallback(
    (e) => excluded.find((s) => s.id === e.id),
    [excluded]
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {evidence.map((e) => (
          <Grid
            key={e.id}
            item
            xs={6}
            sm={4}
            onClick={() => dispatch(cycle(e))}
          >
            <Paper
              className={classNames(classes.paper, {
                [classes.included]: isIncluded(e),
                [classes.excluded]: isExcluded(e),
              })}
            >
              <span className={classes.icon}>{iconMap(e.id)}</span>

              {e.short}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
