import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default function IconButtonWrapper({ children, ...props }) {
  return <IconButton {...props}>{children}</IconButton>;
}
