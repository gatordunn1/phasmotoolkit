import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import { iconMap } from '../evidence/evidenceSlice';

const useStyles = makeStyles((theme) => ({
  invalid: {
    padding: '0 5px',
    margin: '5px 5px',
    color: theme.palette.error.dark,
  },
  valid: {
    padding: '0 5px',
    margin: '5px 5px',
    color: theme.palette.success.dark,
  },
}));

export default function Ghost({ ghost, handleClick, isValid }) {
  const classes = useStyles();

  return (
    <Chip
      avatar={ghost.evidence.map((ev) => iconMap(ev))}
      variant='outlined'
      size='large'
      label={ghost.name}
      onClick={() => handleClick(ghost)}
      className={classNames(isValid ? classes.valid : classes.invalid)}
    />
  );
}
