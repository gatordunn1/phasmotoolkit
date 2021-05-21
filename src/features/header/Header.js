import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: 'center',
    margin: '10px 0 15px 0',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h2' gutterbottom>
        Phasmo Toolkit
      </Typography>
    </div>
  );
}
