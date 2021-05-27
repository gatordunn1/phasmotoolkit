import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@mdi/react";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Select from "@material-ui/core/Select";

import {
  randomizeJob,
  resetSection,
  selectRandomized,
  selectRandomizedCounts,
  selectSectionItems,
  updateRandomizerTypeCount,
} from "./jobRandomizerSlice";
import { randomizerSections } from "./constants";

// import Accent from "../../../common/Accent";
import Readable from "../../../common/Readable";

const useStyles = makeStyles((theme) => ({
  jobGrid: {
    [theme.breakpoints.up("md")]: {
      gap: "20px",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "& > div.section": {
      "& > .header": {
        backgroundColor: theme.palette.background.paperalt,
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
        color: theme.palette.text.secondary,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        padding: "5px 20px 5px 20px",
        width: "100%",
        "& > .selectBox": {
          justifySelf: "flex-end",
        },
        "& > .headerIcon": {
          alignSelf: "center",
          margin: 0,
          padding: 0,
          verticalAlign: "middle",
        },
        "& > .sectionTitle": {
          justifySelf: "center",
        },
      },
      backgroundColor: theme.palette.background.paper,
      borderRadius: "5px",
      display: "inline",
    },
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(1, 1fr)",
  },
  randomizeAll: {
    "&:active": {
      backgroundColor: theme.palette.background.paperalt,
      color: theme.palette.text.secondary,
    },
    "&:hover": {
      color: theme.palette.action.hover,
    },
    cursor: "pointer",
    margin: "0 0 10px 0",
  },
  resultsList: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
  },
  root: {
    margin: "10px 0 10px 0",
    width: "95vw",
  },
}));

const RandomizerResult = ({ results }) => {
  const classes = useStyles();

  return (
    <div className={classes.resultsList}>
      {results.map((r) => (
        <div key={r.id}>{r.display}</div>
      ))}
    </div>
  );
};

const SectionCountSelect = ({ currentValue, handleChange }) => {
  const options = [1, 2, 3, 4, 5, 6];

  return (
    <FormControl className={"selectBox"}>
      <Select
        value={currentValue}
        onChange={handleChange}
        inputProps={{
          name: "itemcount",
          id: "item-native-simple",
        }}
      >
        {options.map((optionValue) => (
          <MenuItem key={`optionItem_${optionValue}`} value={optionValue}>
            {optionValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function JobRandomizer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const randomized = useSelector(selectRandomized);
  const randomizedCounts = useSelector(selectRandomizedCounts);
  const sectionItems = useSelector(selectSectionItems);

  const remainingSectionItems = React.useMemo(() => {
    return Object.keys(sectionItems).reduce(
      (sections, section) => ({
        ...sections,
        [section]: sectionItems[section].filter((x) => !x.used).length,
      }),
      {}
    );
  }, [sectionItems]);

  const spinTheWheel = React.useCallback(() => {
    // Reset any sections with insufficient un-used items left
    for (const sectionItemKey in sectionItems) {
      if (remainingSectionItems[sectionItemKey] < randomizedCounts[sectionItemKey]) {
        dispatch(resetSection(sectionItemKey));
      }
    }
    // Generate a new batch
    dispatch(randomizeJob());
  }, [dispatch, randomizedCounts, remainingSectionItems, sectionItems]);

  return (
    <div className={classes.root}>
      <Paper className={classes.randomizeAll} onClick={spinTheWheel}>
        Generate Randomized Job
      </Paper>
      <div className={classes.jobGrid}>
        {randomizerSections.map((section) => (
          <div key={section.display} className="section">
            <span className="header">
              <Icon className={"headerIcon"} path={section.iconPath} size={1} />
              <Readable className="sectionTitle">{section.display}</Readable>
              {["evidence", "other"].includes(section.id) ? (
                <SectionCountSelect
                  currentValue={randomizedCounts[section.id]}
                  handleChange={(e) =>
                    dispatch(updateRandomizerTypeCount({ ...section, count: e.target.value }))
                  }
                />
              ) : (
                <span> </span>
              )}
            </span>
            <div>
              {randomized[section.id].length > 0 ? (
                <RandomizerResult results={randomized[section.id]} />
              ) : (
                Array.from(Array(randomizedCounts[section.id]).keys()).map((key) => (
                  <div key={`ph_${key}`}>&nbsp;</div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
