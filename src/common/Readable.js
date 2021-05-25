import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Oswald', sans-serif !important",
  },
}));

export default function Readable({ children, className, ...props }) {
  const classes = useStyles();

  return (
    <span className={clsx([classes.root, className])} {...props}>
      {children}
    </span>
  );
}
