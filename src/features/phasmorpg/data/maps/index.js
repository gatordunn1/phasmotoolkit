import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import HomeIcon from "@material-ui/icons/Home";
import { mdiTractor } from "@mdi/js";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Icon from "@mdi/react";

const mapTypes = {
  street: {
    display: "Street House",
    size: "Small",
    pointValue: 100,
  },
  road: {
    display: "Road House",
    size: "Small",
    pointValue: 150,
  },
  farm: {
    display: "Farmhouse",
    size: "Small",
    pointValue: 200,
  },
  school: {
    display: "School",
    size: "Medium",
    pointValue: 300,
  },
  institution: {
    display: "",
    size: "Large",
    pointValue: 400,
  },
};

export const iconMapMap = {
  tanglewood: <HomeIcon />,
  edgefield: <HomeIcon />,
  ridgeview: <HomeIcon />,
  grafton: <Icon path={mdiTractor} title="Spirit Box" size={1} aria-hidden={true} />,
  bleasdale: <Icon path={mdiTractor} title="Spirit Box" size={1} aria-hidden={true} />,
  brownstone: <SchoolIcon />,
  prison: <GavelIcon />,
  asylum: <LocalHospitalIcon />,
};

const maps = [
  {
    id: "tanglewood",
    display: "Tanglewood",
    type: mapTypes.street,
    unlocked: false,
    act: "act1",
  },
  {
    id: "edgefield",
    display: "Edgefield",
    type: mapTypes.street,
    act: "act1",
  },
  {
    id: "ridgeview",
    display: "Ridgeview",
    type: mapTypes.road,
    act: "act1",
  },
  {
    id: "grafton",
    display: "Grafton",
    type: mapTypes.farm,
    act: "act2",
  },
  {
    id: "bleasdale",
    display: "Bleasdale",
    type: mapTypes.farm,
    act: "act2",
  },
  {
    id: "brownstone",
    display: "High School",
    type: mapTypes.school,
    act: "act2",
  },
  {
    id: "prison",
    display: "Prison",
    type: mapTypes.institution,
    act: "act3",
  },
  {
    id: "asylum",
    display: "Asylum",
    type: mapTypes.institution,
    act: "act3",
  },
].map((map) => ({
  ...map,
  unlocked: false,
  unlockable: false,
}))

export const mapCategories = {
  easy: ["tanglewood", "edgefield", "ridgeview"],
  medium: ["grafton", "bleasdale", "brownstone"],
  hard: ["prison", "asylum"],
};

export const mapActList = {
  act1: ["tanglewood", "edgefield", "grafton"],
  act2: ["ridgeview", "bleasdale", "brownstone"],
  act3: ["prison", "asylum"],
};

export default maps;
