import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { selectFirstname, selectLastname, resetGhostName } from "../ghostname/ghostNameSlice";
import SideDrawer from "../sidedrawer/SideDrawer";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 0 0 0",
    width: "100vw",
    padding: "0 10px 0 10px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
    },
  },
  ghostname: {
    borderRadius: "5px",
    display: "flex",
    alignContent: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
    width: "10em",
    backgroundColor: theme.palette.info.dark,
    "&:hover": {
      color: theme.palette.error.main,
    },
  },
  icon: {
    float: "right",
    alignSelf: "center",
  },
  menu: {
    justifySelf: "flex-end",
  },
  reset: {
    marginLeft: "10px",
  },
  title: {
    fontFamily: "Indie Flower !important",
    justifySelf: "flex-start",
    color: theme.palette.text.primary,
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const firstname = useSelector(selectFirstname);
  const lastname = useSelector(selectLastname);

  return (
    <Paper square className={classes.container}>
      <span>
        <span className={classes.title}>PhasmoKit</span>
      </span>
      {firstname && (
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => dispatch(resetGhostName())}
          startIcon={<DeleteIcon />}
        >
          {firstname} {lastname}
        </Button>
      )}
      <span className={classes.menu}>
        <SideDrawer />
      </span>
    </Paper>
  );
}
