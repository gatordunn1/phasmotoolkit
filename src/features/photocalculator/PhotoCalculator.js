import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import React from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import Accent from "../../common/Accent";
import IconButton from "../../common/IconButton";
import Readable from "../../common/Readable";

import {
  addPhoto,
  reset as resetPhotoCalculator,
  selectCollectedPhotos,
  selectPhotoCounts,
  selectTotalValue,
} from "./photoCalculatorSlice";
import { photoDetails } from "./constants";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  disabled: {
    opacity: "0.5",
    pointerEvents: "none",
  },
  photoTypes: {
    justifySelf: "flex-end",
    gridArea: "photoTypes",
    color: theme.palette.secondary.light,
  },
  photoStars: {
    gridArea: "photoStars",
    justifySelf: "center",
  },
  photoTypeCount: {
    gridArea: "photoTypeCount",
    justifySelf: "flex-start",
  },
  photoTotalValue: {
    gridArea: "photoTotalValue",
  },
  photoDetails: {
    padding: 0,
    margin: 0,
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    justifyItems: "center",
    justifySelf: "center",
    width: "100vw",
  },
  photoTypeContainer: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    margin: 0,
    width: "90vw",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateAreas: '"photoTypes photoStars photoTypeCount"',
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  resetButton: {
    opacity: "0.5",
    "&:hover": {
      background: "none",
    },
  },
  resetButtonActive: {
    opacity: 1,
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.dark,
      background: "none",
    },
  },
  root: {
    padding: "10px 0 10px 0",
  },
  starIcons: {
    "& > button": {
      color: theme.palette.text.accent,
    },
  },
  subtitle: {
    fontSize: "0.85em",
    margin: "-10px 0 10px 0 ",
  },
  title: {
    margin: "10px 0 0 0",
    fontSize: "1.4em",
  },
}));

export default function PhotoCalculator() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const collectedPhotos = useSelector(selectCollectedPhotos);
  const totalValue = useSelector(selectTotalValue);
  const photoCounts = useSelector(selectPhotoCounts);

  const collectPhoto = (photo) => () => {
    dispatch(addPhoto(photo));
  };

  const isBookFull = React.useMemo(() => collectedPhotos.length >= 10, [collectedPhotos]);

  const isPhotoTypeFull = React.useCallback(
    (photoType) => {
      switch (photoType) {
        case "ghost":
        case "bone":
        case "ouijaboard":
          return photoCounts[photoType] >= 1;
        default:
          return false;
      }
    },
    [photoCounts]
  );

  const totalPhotos = React.useMemo(() => collectedPhotos.length, [collectedPhotos]);

  const handleResetClick = () => dispatch(resetPhotoCalculator());

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Photo Calculator
        <IconButton
          className={clsx(classes.resetButton, { [classes.resetButtonActive]: totalValue > 0 })}
          onClick={handleResetClick}
        >
          <MoneyOffIcon />
        </IconButton>
      </div>
      <div className={classes.subtitle}>
        <Readable>
          Click the Stars to Collect Photos | <Accent>${totalValue}</Accent> |{" "}
          <Accent>{totalPhotos} photos</Accent>
        </Readable>
      </div>
      <div className={classes.photoDetails}>
        {photoDetails.map((photoType) => (
          <span
            className={clsx(classes.photoTypeContainer, {
              [classes.disabled]: isPhotoTypeFull(photoType.id) || isBookFull,
            })}
            key={photoType.id}
          >
            <span className={classes.photoTypes}>{photoType.display}</span>
            <span className={classes.photoStars}>
              <ButtonGroup
                key={photoType.id}
                color="primary"
                aria-label={`${photoType.id} button group`}
                variant="text"
                className={classes.starIcons}
              >
                <Button>
                  <StarBorderIcon onClick={collectPhoto({ stars: 1, ...photoType })} />
                </Button>
                <Button>
                  <StarBorderIcon onClick={collectPhoto({ stars: 2, ...photoType })} />
                </Button>
                <Button>
                  <StarBorderIcon onClick={collectPhoto({ stars: 3, ...photoType })} />
                </Button>
              </ButtonGroup>
            </span>
            <span className={classes.photoTypeCount}>
              <Readable>{photoCounts[photoType.id]}</Readable>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
