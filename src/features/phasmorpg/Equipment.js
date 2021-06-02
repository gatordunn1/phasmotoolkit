import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import sortBy from "lodash.sortby";

import { addAlert } from "../../appSlice";
import { buyItem, sellItem, selectActiveCharacter } from "./phasmoRPGSlice";
import { data } from "./constants";
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
      color: `${theme.palette.text.secondary} !important`,
    },
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  hasHQLoot: {
    color: theme.palette.text.accent,
  },
  characterTraitsDetails: {
    padding: theme.spacing(0, 1, 0, 1),
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
    cursor: "pointer",
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
    color: theme.palette.text.secondary,
  },
  itemTypeLQLoot: {
    color: theme.palette.success.dark,
  },
  itemTypeHQLoot: {
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
  storeModeSelected: {
    color: theme.palette.secondary.light,
  },
  flipAnimation: {
    webkitAnimation: "flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
    animation: "flip-vertical-right 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 1, 1, 1),
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1, 0, 0, 0),
  },
  sellLootHover: {
    backgroundColor: `${theme.palette.action.disabledBackground} !important`,
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
  const [sellLootHover, setSellLootHover] = React.useState(false);

  const characterItems = React.useMemo(() => sortBy(character.items, ["sortWeight"]), [character]);
  const sellableLoot = React.useMemo(
    () => characterItems.filter((item) => ["lqloot", "hqloot"].includes(item.type)),
    [characterItems]
  );

  const sellableLootTotal = React.useMemo(
    () => sellableLoot.reduce((totalValue, item) => totalValue + item.pointValues.sell, 0),
    [sellableLoot]
  );

  const handleStoreModeToggle = () => setStoreMode((prev) => (prev === "sell" ? "buy" : "sell"));
  const handleSellJunk = () => {
    const junk = characterItems.filter((item) => ["lqloot", "hqloot"].includes(item.type));
    if (junk.length > 0) {
      let totalValue = 0;
      for (const item of junk) {
        totalValue += item.pointValues.sell;
        dispatch(sellItem(item));
      }

      dispatch(
        addAlert({
          severity: "success",
          message: `Sold ${junk.length} loot items for $${totalValue}`,
        })
      );
    }
  };

  const characterHasHQLoot = React.useMemo(
    () => characterItems.find((item) => item.type === "hqloot"),
    [characterItems]
  );

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          className={clsx(classes.accordionSummary, { [classes.hasHQLoot]: characterHasHQLoot })}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Equipment ({characterItems.length})</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.storeHeader}>
            <span className={classes.storeButtons}>
              <Readable onClick={handleStoreModeToggle} className={classes.toggleStoreMode}>
                <span className={clsx({ [classes.storeModeSelected]: storeMode === "sell" })}>
                  Inventory
                </span>
                <Switch
                  checked={storeMode === "buy"}
                  name="storeMode"
                  inputProps={{ "aria-label": "store inventory checkbox" }}
                  color="default"
                />

                <span className={clsx({ [classes.storeModeSelected]: storeMode === "buy" })}>
                  Store
                </span>
              </Readable>
            </span>
            {storeMode === "sell" && (
              <Button
                onMouseEnter={() => setSellLootHover(true)}
                onMouseLeave={() => setSellLootHover(false)}
                variant="text"
                className={classes.toggleStoreMode}
                onClick={() => handleSellJunk()}
                disabled={sellableLoot.length === 0}
              >
                Sell Loot (${sellableLootTotal})
              </Button>
            )}
          </div>
          {storeMode === "sell" ? (
            <div key="inventory_items" className={classes.flipAnimation}>
              {characterItems.map((item, index) => (
                <div
                  key={`${character.id}_owned_${item.id}_${index}`}
                  className={clsx(classes.characterTraitsDetails, {
                    [classes.sellLootHover]:
                      ["hqloot", "lqloot"].includes(item.type) && sellLootHover,
                  })}
                >
                  <Readable
                    className={clsx({
                      [classes.itemTypeJunk]: item.type === "junk",
                      [classes.itemTypeLQLoot]: item.type === "lqloot",
                      [classes.itemTypeHQLoot]: item.type === "hqloot",
                      [classes.itemTypeEvidence]: item.type === "evidence",
                      [classes.itemTypeObjectives]: item.type === "objectives",
                    })}
                  >
                    {item.display}
                  </Readable>
                  {["hqloot", "lqloot"].includes(item.type) && (
                    <Readable className={classes.sellItem}>+${item.pointValues.sell}</Readable>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div key="store_items" className={classes.flipAnimation}>
              {data.items
                .filter(
                  (item) =>
                    ["evidence", "objectives", "light"].includes(item.type) &&
                    !characterItems.find((i) => i.display === item.display)
                )
                .sort((a, b) => b.pointValues.buy - a.pointValues.buy)
                .map((item, index) => (
                  <div
                    className={classes.characterTraitsDetails}
                    key={`${character.id}_store_${item.id}_${index}`}
                  >
                    <Readable
                      className={clsx({
                        [classes.itemTypeJunk]: item.type === "junk",
                        [classes.itemTypeEvidence]: item.type === "evidence",
                        [classes.itemTypeObjectives]: item.type === "objectives",
                      })}
                    >
                      {item.display}
                    </Readable>
                    <Button
                      disabled={character.bankedPoints < item.pointValues.buy}
                      onClick={() => dispatch(buyItem(item))}
                      className={classes.buyItem}
                      variant="text"
                    >
                      -${item.pointValues.buy}
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
