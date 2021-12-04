import SchoolIcon from "@material-ui/icons/School";
import GavelIcon from "@material-ui/icons/Gavel";
import HomeIcon from "@material-ui/icons/Home";
import { mdiTractor } from "@mdi/js";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CabinIcon from '@mui/icons-material/Cabin';
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
  outdoor: {
    display: "Outdoor",
    size: "Medium",
    pointValue: 300,
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
  maplelodge: <CabinIcon />,
  ridgeview: <HomeIcon />,
  willow: <HomeIcon />,
  grafton: <Icon path={mdiTractor} title="Grafton" size={1} aria-hidden={true} />,
  bleasdale: <Icon path={mdiTractor} title="Bleasdale" size={1} aria-hidden={true} />,
  brownstone: <SchoolIcon />,
  prison: <GavelIcon />,
  asylum: <LocalHospitalIcon />,
};

const maps = [
  {
    id: "tanglewood",
    display: "Tanglewood",
    type: "street",
    unlocked: false,
    act: "act1",
  },
  {
    id: "edgefield",
    display: "Edgefield",
    type: "street",
    act: "act1",
  },
  {
    id: "ridgeview",
    display: "Ridgeview",
    type: "road",
    act: "act1",
  },
  {
    id: "willow",
    display: "Willow",
    type: "street",
    act: "act2",
  },
  {
    id: "grafton",
    display: "Grafton",
    type: "farm",
    act: "act2",
  },
  {
    id: "bleasdale",
    display: "Bleasdale",
    type: "farm",
    act: "act2",
  },
  {
    id: "brownstone",
    display: "High School",
    type: "school",
    act: "act3",
  },
  {
    id: "maplelodge",
    display: "Maple Lodge",
    type: "outdoor",
    act: "act3",
  },
  {
    id: "prison",
    display: "Prison",
    type: "institution",
    act: "act3",
  },
  {
    id: "asylum",
    display: "Asylum",
    type: "institution",
    act: "act3",
  },
].map((map) => ({
  ...map,
  unlocked: false,
  unlockable: false,
  pointValue: mapTypes[map.type].pointValue,
}))

export const mapCategories = {
  easy: ["tanglewood", "edgefield", "ridgeview"],
  medium: ["willow", "grafton", "bleasdale"],
  hard: ["brownstone", "prison", "asylum"],
};

export const mapActList = {
  act1: ["tanglewood", "edgefield", "ridgeview"],
  act2: ["willow", "grafton", "bleasdale"],
  act3: ["brownstone", "prison", "asylum"],
};

export default maps;
