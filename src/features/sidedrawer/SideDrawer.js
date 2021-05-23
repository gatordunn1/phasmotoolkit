import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import FormatPaintIcon from "@material-ui/icons/FormatPaint";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import SearchIcon from "@material-ui/icons/Search";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";

import { resetEvidence } from "../evidence/evidenceSlice";
import { resetGhostName } from "../ghostname/ghostNameSlice";
import { resetGhosts } from "../ghosts/ghostsSlice";
import { selectThemeType, toggleTheme } from "../theme/themeSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0 15px 0",
    width: "100vw",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.primary,
    "& > span ": {
      alignSelf: "center",
    },
  },
  label: {
    fontSize: "1.3rem",
    textAlign: "center",
    padding: "5px 0 10px 0",
  },
  reset: {
    margin: 0,
    alignSelf: "center",
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: "transparent",
    },
  },
  list: {
    width: 250,
    color: theme.palette.text.primary,
  },
  fullList: {
    width: "auto",
  },
}));

export default function SideDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const themeType = useSelector(selectThemeType)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const resetApp = () => {
    dispatch(resetEvidence());
    dispatch(resetGhosts());
    dispatch(resetGhostName());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuToggleItems = React.useMemo(
    () => [
      {
        id: "theme",
        display: `${themeType === 'dark' ? 'Light' : 'Dark'} Theme`,
        onClick: () => dispatch(toggleTheme()),
        icon: <FormatPaintIcon />,
      },
      {
        id: "ghostname",
        display: "Ghost Name",
        onClick: () => console.log("Toggle Ghost Name"),
        icon: <SortByAlphaIcon />,
      },
      {
        id: "secondaryevidence",
        display: "Secondary Evidence",
        onClick: () => console.log("Toggle Secondary Evidence"),
        icon: <SearchIcon />,
      },
    ],
    [dispatch, themeType]
  );

  const menuActionItems = [
    {
      id: "reset",
      display: "Reset App",
      onClick: () => resetApp(),
      icon: <ReplayIcon />,
    },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.label}>Toggle Items</div>
      <Divider />
      <List>
        {menuToggleItems.map((item, index) => (
          <ListItem button key={item.id} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.display} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuActionItems.map((item, index) => (
          <ListItem button key={item.id} onClick={item.onClick} >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.display} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}
      <React.Fragment>
        {/* <Button onClick={toggleDrawer("right", true)}>
          <Menu />
        </Button> */}
        <IconButton
          className={classes.reset}
          color="default"
          aria-label="side drawer"
          component="span"
          onClick={toggleDrawer("right", true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"right"} open={state["right"]} onClose={toggleDrawer("right", false)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
