import { nanoid } from "nanoid";
import categories from "./categories";

const traits = [
  {
    display: "Chatterbox",
    description: "Must speak into the mic during hunts until you reach a hiding spot.",
    category: categories.reckless,
  },
  {
    display: "Manic Skeptic",
    description: "If found, must immediately ask the Ouija board five questions.",
    category: categories.reckless,
  },
  {
    display: "Moonwalker",
    description: "Must move backwards at all times.",
    category: categories.silly,
  },
  {
    display: "Krusty Locomotion",
    description: "Must always crouch and move side-to-side only (crab walk).",
    category: categories.silly,
  },
  {
    display: "2000 Flushes",
    description: "Upon entering any bathroom, must flush all flushable toilets.",
    category: categories.obsessive,
  },
  {
    display: "Drop, Drop, Drop",
    description: "Must drop all items at the start of a hunt.",
    category: categories.nervous,
  },
  {
    display: "You Spin Me Right Round",
    description: "Must spin in place for two full circles at the start of a hunt.",
    category: categories.nervous,
  },
  {
    display: "Creeper",
    description: "Must collect all photos within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Krampus",
    description: "Must collect all toys, dolls, balls, blocks, etc within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Profiteer",
    description: "Must collect all cell phones and laptops within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Home Un-maker",
    description: "Must collect all plates, cups, and silverware within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Artist",
    description: "Must collect all spraypaint cans within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Nyctalopian",
    description: "Must turn on the lights in every room they enter and keep them on.",
    category: categories.nervous,
  },
  {
    display: "Photophobian",
    description: "Must turn off the lights in every room they enter and keep them off.",
    category: categories.nervous,
  },
].map((x) => ({
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export default traits;
