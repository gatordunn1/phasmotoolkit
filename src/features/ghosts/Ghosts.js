import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { iconMap, selectExcluded, selectIncluded } from "../evidence/evidenceSlice";
import { selectGhosts, selectSelected, setActiveGhost, updateGhosts } from "./ghostsSlice";
import Ghost from "../ghost/Ghost";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  description: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    textAlign: "center",
    "& > span": {
      width: "100vw",
    },
  },
  ghostHeader: {
    display: "flex",
    justifyContent: "center",
  },
  ghostName: {
    textAlign: "right",
    width: "50vw",
  },
  ghostIcons: {
    "& > span > svg": {
      margin: "0 10px 0 10px",
    },
    textAlign: "left",
    width: "50vw",
  },
  ghosts: {
    alignContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    margin: "10px 0 10px 0",
    padding: "10px 0 10px 0",
    width: "100vw",
  },
  included: {
    color: `${theme.palette.success.main} !important`,
  },
  labeled: {
    display: "flex",
    "& > span": {
      width: "50vw",
    },
    "& > span:first-child": {
      textAlign: "center",
      fontWeight: "bold",
    },
    "& > span:last-child": {
      textAlign: "left",
    },
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  selectedGhost: {
    padding: "10px",
    width: "100vw",
    color: theme.palette.text.primary,
    margin: 0,
    "& > * ": {
      fontFamily: "Indie Flower !important",
    },
  },
  evidenceBook: {
    width: "500px",
    boxShadow: "0 0 8px 8px black inset",
  },
}));

export function Ghosts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ghosts = useSelector(selectGhosts);
  const included = useSelector(selectIncluded);
  const excluded = useSelector(selectExcluded);
  const selectedGhost = useSelector(selectSelected);

  React.useEffect(() => {
    dispatch(updateGhosts({ included, excluded }));
  }, [dispatch, excluded, included]);

  const handleClick = (ghost) => {
    if (selectedGhost && selectedGhost.name === ghost.name) {
      dispatch(setActiveGhost(null));
    } else {
      dispatch(setActiveGhost(ghost));
    }
  };

  const evidenceIsIncluded = React.useCallback(
    (ev) => included.some((i) => i.id === ev),
    [included]
  );

  return (
    <div className={classes.root}>
      <Paper square className={classes.ghosts}>
        {ghosts.map((ghost) => {
          return <Ghost key={ghost.name} ghost={ghost} handleClick={handleClick} />;
        })}
      </Paper>
      <div className={classes.selectedGhost}>
        {selectedGhost && (
          <div>
            <div className={classes.ghostHeader}>
              <span className={classes.ghostName}>{selectedGhost.name}</span>
              <span className={classes.ghostIcons}>
                {selectedGhost.evidence.map((ev) => (
                  <span
                    key={ev}
                    className={evidenceIsIncluded(ev) ? classes.included : ""}
                    title={ev}
                  >
                    {iconMap(ev)}
                  </span>
                ))}
              </span>
            </div>
            <div className={classes.description}>
              <span>{selectedGhost.description}</span>
            </div>
            <div className={classes.labeled}>
              <span>Unique Strengths:</span>
              <span>{selectedGhost.strengths}</span>
            </div>
            <div className={classes.labeled}>
              <span>Weaknesses:</span>
              <span>{selectedGhost.weaknesses}</span>
            </div>
            {selectedGhost.secondaryEvidence.map((secondaryEvidence, index) => (
              <div key={`secondaryEvidence_${index}`} className={classes.labeled}>
                <span>Secondary Evidence:</span>
                <span>{secondaryEvidence}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
