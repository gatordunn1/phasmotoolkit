import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

const useStyles = (props) =>
  makeStyles((theme) => ({
    root: {
      color: `${theme.palette.text[props.color]} !important`,
      textTransform: props.transform,
      fontSize: props.size
    },
  }));

export default function Accent({ children, color, size, className, transform, ...props }) {
  const { root } = useStyles({ color, transform: transform || "none", size: size || "1.0em" })();

  return (
    <span className={clsx([root, className])} {...props}>
      {children}
    </span>
  );
}
