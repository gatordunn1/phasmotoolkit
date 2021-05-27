import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { iconMap, selectExcluded, selectIncluded } from "../evidence/evidenceSlice";
import { selectGhosts, selectSelected, setActiveGhost, updateGhosts } from "./ghostsSlice";
import Ghost from "../ghost/Ghost";
import Accent from '../../common/Accent';
import Readable from '../../common/Readable';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    cursor: "pointer",
  },
  root: {
    margin: "10px 0 10px 0",
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
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: theme.palette.secondary.dark,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: "5px 0 0 0",
    margin: "0 0 5px 0",
    "& > span": {
      alignSelf: "center",
    },
  },
  ghostName: {
    justifySelf: "flex-start",
    fontSize: "1.2em",
  },
  ghostIcons: {
    "& > span > svg": {
      margin: "5px 10px 0 10px",
    },
  },
  ghosts: {
    display: "grid",
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    justifyItems: "stretch",
    gap: "10px",
    width: "95vw",
    gridTemplateColumns: "repeat(2, 1fr)",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: "20px",
    },
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
    backgroundColor: theme.palette.background.default,
    padding: "0 10px 10px 10px",
    color: theme.palette.text.primary,
    borderTop: `2px solid ${theme.palette.primary.main}`,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    margin: 0,
    "& > * ": {
      fontFamily: "Indie Flower !important",
    },
  },
}));

export default function Ghosts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ghosts = useSelector(selectGhosts);
  const included = useSelector(selectIncluded);
  const excluded = useSelector(selectExcluded);
  const selectedGhost = useSelector(selectSelected);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    dispatch(setActiveGhost(null));
  };

  React.useEffect(() => {
    dispatch(updateGhosts({ included, excluded }));
  }, [dispatch, excluded, included]);

  const handleClick = (ghost) => {
    dispatch(setActiveGhost(ghost));
    setOpen(true);
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
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <Paper>
          <div className={classes.selectedGhost}>
            {selectedGhost && (
              <div>
                <div className={classes.ghostHeader}>
                  <span className={classes.ghostName}><Accent><Readable>{selectedGhost.name}</Readable></Accent></span>
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
        </Paper>
      </Backdrop>
    </div>
  );
}
