import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: `${theme.palette.text.accent} !important`,
  },
}));

export default function Accent({ children, className, ...props }) {
  const classes = useStyles();

  return (
    <span className={clsx([classes.root, className])} {...props}>
      {children}
    </span>
  );
}
