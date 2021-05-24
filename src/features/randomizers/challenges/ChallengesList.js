import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { categories } from "./constants";
import { selectChallenges, toggleCategory, toggleChallenge } from "./challengeRandomizerSlice";

const useStyles = makeStyles((theme) => ({
  category: {
    backgroundColor: theme.palette.background.papercontrast,
    padding: "10px",
    margin: "10px",
  },
  categoryTitle: {
    fontSize: "1.4em",
    color: theme.palette.text.contrast,
    textTransform: "capitalize",
  },
  // listItem: {
  //   display: "flex",
  //   "& > * ": {
  //     alignSelf: "center",
  //   },
  // },
  listItem: {
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  titleBox: {
    display: "flex",
    "& > * ": {
      alignSelf: "center",
    },
  },
}));

export default function ChallengesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const challenges = useSelector(selectChallenges);

  const handleToggle = (challengeId) => () => {
    dispatch(toggleChallenge(challengeId));
  };

  const handleToggleCategory = (categoryId) => (e) =>
    dispatch(toggleCategory({ categoryId, enabled: e.target.checked }));

  const categoryCheckedStatuses = React.useMemo(
    () =>
      Object.keys(categories).reduce((categories, categoryId) => {
        const enabledInCategory = challenges.filter(
          (challenge) => challenge.enabled && challenge.categoryId === categoryId
        );
        return {
          ...categories,
          [categoryId]: enabledInCategory.length > 0,
        };
      }, {}),
    [challenges]
  );

  return Object.keys(categories).map((categoryId) => (
    <Paper key={categoryId} className={classes.category}>
      <div className={classes.titleBox}>
        <Checkbox
          edge="start"
          checked={categoryCheckedStatuses[categoryId]}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": `checkbox-category-label-${categoryId}` }}
          onClick={handleToggleCategory(categoryId)}
        />
        <span className={classes.categoryTitle}>{categoryId}</span>
      </div>
      <List className={classes.root}>
        {challenges
          .filter((challenge) => challenge.categoryId === categoryId)
          .map((challenge) => {
            const labelId = `checkbox-list-label-${challenge.id}`;

            return (
              <ListItem
                key={challenge.id}
                role={undefined}
                dense
                button
                onClick={handleToggle(challenge.id)}
                className={classes.listItem}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={challenge.enabled}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  id={labelId}
                  primary={challenge.display}
                />
              </ListItem>
            );
          })}
      </List>
    </Paper>
  ));
}
