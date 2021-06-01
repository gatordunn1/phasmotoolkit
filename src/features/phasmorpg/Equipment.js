import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import { data } from "./constants";
import { buyItem, sellItem, selectActiveCharacter } from "./phasmoRPGSlice";
import Readable from "../../common/Readable";
import { addAlert } from "../../appSlice";

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.background.default,
  },
  accordionDetails: {
    display: "block",
  },
  accordionSummary: {
    "&:hover": {
      color: theme.palette.text.accent,
    },
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  characterTraitsDetails: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    alignContent: "center",
    justifyItems: "space-between",
    justifyContent: "space-between",
    textAlign: "left",
    "& > span": {
      fontSize: "0.8em",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.7em !important",
      },
    },
  },
  buyItem: {
    color: theme.palette.error.main,
  },
  sellItem: {
    color: theme.palette.success.main,
  },
  toggleStoreMode: {
    textTransform: "uppercase",
    fontSize: "0.6em",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.4em",
    },
  },
  itemTypeJunk: {
    color: theme.palette.text.disabled,
  },
  itemTypeEvidence: {
    color: theme.palette.text.accent,
  },
  itemTypeObjectives: {
    color: theme.palette.text.secondary,
  },
  storeHeader: {
    display: "grid",
    justifyContent: "space-between",
    justifyItems: "space-between",
    gridTemplateColumns: "1fr auto",
    "& > span": {
      justifySelf: "flex-start",
      alignSelf: "center",
      color: theme.palette.text.secondary,
      fontWeight: "bold",
    },
  },
  flipAnimation: {
    webkitAnimation: "flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
    animation: "flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.5, 1, 0, 1),
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1, 0, 0, 0),
  },
  storeButtons: {
    display: "flex",
    "& > *": {
      alignSelf: "center",
    },
  },
}));

export default function Equipment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const character = useSelector(selectActiveCharacter);
  const [storeMode, setStoreMode] = React.useState("sell");

  const handleStoreModeToggle = () => setStoreMode((prev) => (prev === "sell" ? "buy" : "sell"));
  const handleSellJunk = () => {
    const junk = character.items.filter((item) => item.type.id === "junk");
    if (junk.length > 0) {
      let totalValue = 0;
      for (const item of junk) {
        totalValue += item.type.pointValues.sell;
        dispatch(sellItem(item));
      }

      dispatch(
        addAlert({
          severity: "success",
          message: `Sold ${junk.length} junk items for $${totalValue}`,
        })
      );
    }
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
          <Typography className={classes.heading}>Equipment ({character.items.length})</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.storeHeader}>
            <span className={classes.storeButtons}>
              <Readable className={classes.toggleStoreMode}>
                Inventory
                <Switch
                  checked={storeMode === "buy"}
                  onChange={handleStoreModeToggle}
                  name="storeMode"
                  inputProps={{ "aria-label": "store inventory checkbox" }}
                  color="default"
                />
                Store
              </Readable>
            </span>
            {storeMode === "sell" && (
              <Button
                variant="text"
                className={classes.toggleStoreMode}
                onClick={() => handleSellJunk()}
              >
                Sell Junk
              </Button>
            )}
          </div>
          {storeMode === "sell" ? (
            <div key="inventory_items" className={classes.flipAnimation}>
              {character.items.map((item, index) => (
                <div
                  className={classes.characterTraitsDetails}
                  key={`${character.id}_owned_${item.id}_${index}`}
                >
                  <Readable
                    className={clsx({
                      [classes.itemTypeJunk]: item.type.id === "junk",
                      [classes.itemTypeEvidence]: item.type.id === "evidence",
                      [classes.itemTypeObjectives]: item.type.id === "objectives",
                    })}
                  >
                    {item.display}
                  </Readable>
                  <Button
                    onClick={() => dispatch(sellItem(item))}
                    className={classes.sellItem}
                    variant="text"
                  >
                    +${item.type.pointValues.sell}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div key="store_items" className={classes.flipAnimation}>
              {data.items
                .filter((item) =>
                  ["evidence", "objectives", "light", "junk"].includes(item.type.id)
                )
                .sort((a, b) => b.type.pointValues.buy - a.type.pointValues.buy)
                .map((item, index) => (
                  <div
                    className={classes.characterTraitsDetails}
                    key={`${character.id}_store_${item.id}_${index}`}
                  >
                    <Readable
                      className={clsx({
                        [classes.itemTypeJunk]: item.type.id === "junk",
                        [classes.itemTypeEvidence]: item.type.id === "evidence",
                        [classes.itemTypeObjectives]: item.type.id === "objectives",
                      })}
                    >
                      {item.display}
                    </Readable>
                    <Button
                      disabled={character.bankedPoints < item.type.pointValues.buy}
                      onClick={() => dispatch(buyItem(item))}
                      className={classes.buyItem}
                      variant="text"
                    >
                      -${item.type.pointValues.buy}
                    </Button>
                  </div>
                ))}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
