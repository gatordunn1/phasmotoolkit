import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  challengeTitle: {
    // whiteSpace: "nowrap",
    // overflow: 'hidden',
  },
  disabled: {
    opacity: "0.25",
    border: `1px solid ${theme.palette.error.main}`,
  },
  root: {
    minWidth: '325px',
    width: '325px',
    maxWidth: '325px',
    margin: '10px',
    backgroundColor: theme.palette.background.papercontrast,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
}));

export default function OutlinedCard({ challenge }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, { [classes.disabled]: !challenge.enabled })}
      variant="outlined"
    >
      <CardContent>
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          {challenge.categoryDisplay}
        </Typography> */}
        <Typography className={classes.challengeTitle} variant="h5" component="h2">
          {challenge.display}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {challenge.categoryDisplay}
        </Typography>
        <Typography variant="body2" component="p">
          {challenge.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


