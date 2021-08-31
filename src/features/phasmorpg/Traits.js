import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";
import React from "react";
import TimerOffIcon from "@material-ui/icons/TimerOff";
import Typography from "@material-ui/core/Typography";

import { addAlert } from "../../appSlice";
import { removeTrait, selectActiveCharacter } from "./phasmoRPGSlice";
import Accent from "../../common/Accent";
import Readable from "../../common/Readable";

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.background.default,
  },
  accordionDetails: {
    display: "block",
    "& > div": {
      padding: theme.spacing(1),
      borderRadius: "5px",
      marginBottom: theme.spacing(1),

    },
    "& > div:nth-child(odd)": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
    },
  },
  accordionSummary: {
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
  onGoingEffect: {
    border: `2px solid ${theme.palette.error.dark}`,
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  removeTrait: {
    color: theme.palette.error.main,
  },
  characterTraitsDetails: {
    fontSize: "0.6em",
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "space-between",
    gap: theme.spacing(1.5),
    textAlign: "left",
    webkitAnimation: "blink-1 1.5s 2 both",
    animation: "blink-1 1.5s 2 both",
  },
}));

export default function Traits() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const character = useSelector(selectActiveCharacter);
  const [effects, setEffects] = React.useState([]);

  const handleRemoveTrait = (trait) => {
    dispatch(removeTrait(trait));
    dispatch(
      addAlert({
        severity: "success",
        message: `Removed Trait: ${trait.display}`,
      })
    );
    dispatch(
      addAlert({
        severity: "error",
        message: `Lost: $${trait.category.removalCost}`,
      })
    );
  };

  const renderRemainingRoundsIcon = (duration) => {
    switch (duration) {
      case -1:
        return (
          <Accent color="error">
            <TimerOffIcon />
          </Accent>
        );
      case 1:
        return (
          <Accent color="accent">
            <Filter1Icon />
          </Accent>
        );
      case 2:
        return (
          <Accent color="accent">
            <Filter2Icon />
          </Accent>
        );
      case 3:
        return (
          <Accent color="accent">
            <Filter3Icon />
          </Accent>
        );
      default:
        return (
          <Accent color="disabled">
            <TimerOffIcon />
          </Accent>
        );
    }
  };

  // Sort traits
  React.useEffect(() => {
    const currentEffects = [...character.traits];
    const sortedEffects = currentEffects.sort((a, b) => {
      if (a.onGoingEffect && !b.onGoingEffect) {
        return -1;
      }

      if (!a.onGoingEffect && b.onGoingEffect) {
        return 1;
      }

      if (a.duration > 0 && b.duration === -1) {
        return -1;
      }

      if (a.duration === -1 && b.duration > 0) {
        return 1;
      }

      return a.duration > b.duration ? -1 : 1;
    });

    setEffects(sortedEffects);
  }, [character.traits]);

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Effects ({character.traits.length})</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {effects.map((trait) => (
            <div
              className={clsx(classes.characterTraitsDetails, {
                [classes.onGoingEffect]: trait.onGoingEffect,
              })}
              key={trait.id}
            >
              <Readable>{renderRemainingRoundsIcon(trait.remaining)}</Readable>
              <Readable>
                <Accent color="contrast">{trait.display}</Accent>: {trait.description}
              </Readable>
              <Button
                onClick={() => handleRemoveTrait(trait)}
                disabled={character.bankedPoints < trait.removalCost}
                className={classes.removeTrait}
                variant="text"
              >
                <span>-${trait.removalCost}</span>
              </Button>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
