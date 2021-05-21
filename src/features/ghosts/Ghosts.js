import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGhosts, selectSelected } from './ghostsSlice';
import { selectExcluded, selectIncluded } from '../evidence/evidenceSlice';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Ghost from '../ghost/Ghost';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  ghosts: {
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2b2d42',
    margin: '10px 0 10px 0',
    padding: '10px 0 10px 0',
    width: '100vw',
  },
  paper: {
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  selectedGhost: {
    padding: '10px',
    width: '100vw',
    margin: 0,
    fontFamily: "Indie Flower",
  },
  evidenceBook: {
    width: '500px',
    boxShadow: '0 0 8px 8px black inset',
  },
}));

export function Ghosts() {
  const classes = useStyles();
  const ghosts = useSelector(selectGhosts);
  const included = useSelector(selectIncluded);
  const excluded = useSelector(selectExcluded);
  const [selectedGhost, setSelectedGhost] = React.useState();

  const handleClick = (ghost) => {
    setSelectedGhost(ghost);
  };

  const isValid = React.useCallback((ghost) => {
    if (excluded.some((ev) => ghost.evidence.includes(ev.id))) {
      return false;
    }

    if (included.some((ev) => !ghost.evidence.includes(ev.id))) {
      return false;
    }

    return true;
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.ghosts}>
        {ghosts.map((ghost) => {
          return (
            <Ghost
              key={ghost.name}
              ghost={ghost}
              isValid={isValid(ghost)}
              handleClick={handleClick}
            />
          );
        })}
      </Paper>
      <div className={classes.selectedGhost}>
        {selectedGhost && (
          <div>
            <Typography variant='h5' gutterbottom>
              {selectedGhost.name}
            </Typography>
            <Typography variant='body2' paragraph>
              {selectedGhost.description}
            </Typography>
            <Typography variant='body2' paragraph>
              {selectedGhost.strengths}
            </Typography>
            <Typography variant='body2' paragraph>
              {selectedGhost.weaknesses}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
