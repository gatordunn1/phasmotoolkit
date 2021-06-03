import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import React from "react";

import { iconMap, selectExcluded, selectIncluded } from "../evidence/evidenceSlice";
import { selectGhosts, selectSelected, setActiveGhost, updateGhosts } from "./ghostsSlice";
import Ghost from "../ghost/Ghost";
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    cursor: "pointer",
  },
  root: {
    margin: theme.spacing(0.5, 0, 1.5, 0),
  },
  description: {
    justifyContent: "center",
    flexWrap: "wrap",
    textAlign: "left",
    "& > span": {
      width: "100vw",
    },
    margin: theme.spacing(1.5, -2, 1.5, -2),
    padding: theme.spacing(0.5, 1.5, 0.5, 1.5),
    backgroundColor: theme.palette.background.paperalt,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: "block",
  },
  ghostHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
    margin: theme.spacing(0, -2, 0, -2),
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
      textAlign: "left",
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
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.secondary.main}`,
    width: "90vw",
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
                  <span className={classes.ghostName}>
                    <Accent color="accent">
                      <Readable>{selectedGhost.name}</Readable>
                    </Accent>
                  </span>
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
                  <Accent color="secondary">{selectedGhost.description}</Accent>
                </div>
                <div className={classes.labeled}>
                  <Accent color="contrast">Unique Strengths</Accent>
                  <span>{selectedGhost.strengths}</span>
                </div>
                <div className={classes.labeled}>
                  <Accent color="contrast">Weaknesses</Accent>
                  <span>{selectedGhost.weaknesses}</span>
                </div>
                {selectedGhost.secondaryEvidence.map((secondaryEvidence, index) => (
                  <div key={`secondaryEvidence_${index}`} className={classes.labeled}>
                    <Accent color="contrast">Secondary Evidence</Accent>
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
