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
  // selectCollectedPhotos,
  selectPhotos,
  selectPhotoCount,
  selectTotalValue,
} from "./photoCalculatorSlice";
import { photoDistances } from "./constants";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  disabled: {
    opacity: "0.5",
    pointerEvents: "none",
  },
  disablePhotoType: {
    gridArea: "disablePhotoType",
    justifySelf: "flex-end",
    margin: 0,
    padding: 0,
  },
  disablePhotoTypeButton: {
    color: theme.palette.error.main,
    margin: 0,
    padding: 0,
    "&:hover": {
      background: "none",
      color: theme.palette.error.dark,
    },
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
    gridTemplateColumns: "1fr 1fr 1fr",
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
  // const collectedPhotos = useSelector(selectCollectedPhotos);
  const totalValue = useSelector(selectTotalValue);
  const photos = useSelector(selectPhotos);
  const collectedPhotoCount = useSelector(selectPhotoCount);

  const collectPhoto = (photo) => () => {
    dispatch(addPhoto(photo));
  };

  const isBookFull = React.useMemo(() => collectedPhotoCount >= 10, [collectedPhotoCount]);

  // const collectedPhotoPoints = React.useMemo(
  //   () =>
  //     collectedPhotos.reduce((points, photo) => {
  //       return points + photo.points;
  //     }, 0),
  //   [collectedPhotos]
  // );

  // const maxPossible = React.useMemo(() => {
  //   const enabled = photos.filter((photo) => photo.enabled);
  //   const missed = photos.filter((photo) => !photo.enabled && photo.count < photo.limit);
  //   let photoLimit = 10 - collectedPhotos.length;
  //   let photoCount = 0;
  //   console.log(enabled);
  //   const remainingPhotoPoints = enabled.reduce((total, photoType) => {
  //     // Stop counting past the remaining allowed photos
  //     if (photoCount >= photoLimit) return total;

  //     // How many of this type can we collect?
  //     let photoTypeLimit = photoType.limit - photoType.count;

  //     // If we would exceed our limit, take the difference for the available photos remaining
  //     if (photoTypeLimit + photoCount >= photoLimit) {
  //       photoTypeLimit = photoTypeLimit - photoCount;
  //     }

  //     photoCount += photoTypeLimit;

  //     return total + photoValues[photoType.id][3] * photoTypeLimit;
  //   }, 0);

  //   // Account for missed (disabled) photos (ex, ouija board)
  //   const unavailablePhotoPoints = missed.reduce((total, photoType) => {
  //     return total + photoValues[photoType.id][3] * (photoType.limit - photoType.count);
  //   }, 0);

  //   // Return max possible value, capped at 40
  //   return photoTotalConverter(
  //     collectedPhotoPoints + remainingPhotoPoints - unavailablePhotoPoints
  //   );
  // }, [collectedPhotos.length, photos, collectedPhotoPoints]);

  const handleResetClick = () => dispatch(resetPhotoCalculator());

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        Photo Calculator
        <IconButton
          className={clsx(classes.resetButton, { [classes.resetButtonActive]: totalValue > 0 })}
          onClick={handleResetClick}
          aria-label="reset photos"
          title="Reset Photos"
        >
          <MoneyOffIcon />
        </IconButton>
      </div>
      <div className={classes.subtitle}>
        <Readable>
          Click the Stars to Collect Photos |{" "}
          <Accent>
            ${totalValue}
          </Accent>{" "}
          | <Accent>{collectedPhotoCount} photos</Accent>
        </Readable>
      </div>
      <div className={classes.photoDetails}>
        {photos.map((photoType) => (
          <span
            className={clsx(classes.photoTypeContainer, {
              [classes.disabled]: !photoType.enabled || isBookFull,
            })}
            key={photoType.id}
          >
            <span className={classes.photoTypes}>{photoType.display}</span>
            {/* <span className={classes.disablePhotoType}>
              {["bone", "ouijaboard"].includes(photoType.id) && (
                <IconButton
                  className={classes.disablePhotoTypeButton}
                  onClick={() => dispatch(disablePhotoType(photoType.id))}
                  title={`Click if you could not find the ${photoType.display}`}
                >
                  <NotInterestedIcon />
                </IconButton>
              )}
            </span> */}
            <span className={classes.photoStars}>
              <ButtonGroup
                key={photoType.id}
                color="primary"
                aria-label={`${photoType.id} button group`}
                variant="text"
                className={classes.starIcons}
              >
                <Button title={photoType.id === 'ghost' ? photoDistances.ghost[1] : photoDistances.other[1]}>
                  <StarBorderIcon onClick={collectPhoto({ stars: 1, ...photoType })} />
                </Button>
                <Button title={photoType.id === 'ghost' ? photoDistances.ghost[2] : photoDistances.other[2]}>
                  <StarBorderIcon onClick={collectPhoto({ stars: 2, ...photoType })} />
                </Button>
                <Button title={photoType.id === 'ghost' ? photoDistances.ghost[3] : photoDistances.other[3]}>
                  <StarBorderIcon onClick={collectPhoto({ stars: 3, ...photoType })} />
                </Button>
              </ButtonGroup>
            </span>
            <span className={classes.photoTypeCount}>
              <Readable>{photoType.count}</Readable>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
