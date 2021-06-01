import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
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
  },
  accordionSummary: {
    "&:hover": {
      color: theme.palette.text.secondary,
    }
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
    gridTemplateColumns: "1fr auto",
    alignItems: "flex-start",
    textAlign: "left",
  },
}));

export default function Traits() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const character = useSelector(selectActiveCharacter);

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

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
        className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Traits ({character.traits.length})</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div>
            {character.traits.map((trait) => (
              <div className={classes.characterTraitsDetails} key={trait.id}>
                <Readable>
                  <Accent color="contrast">{trait.display}</Accent>: {trait.description}{" "}
                </Readable>
                <Button
                  onClick={() => handleRemoveTrait(trait)}
                  disabled={character.bankedPoints < trait.category.removalCost}
                  className={classes.removeTrait}
                  variant="text"
                >
                  -${trait.category.removalCost}
                </Button>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
