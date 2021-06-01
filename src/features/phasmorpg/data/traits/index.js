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
    display: "Microbladder",
    description: "Upon entering any bathroom, must flush all flushable toilets.",
    category: categories.obsessive,
  },
  {
    display: "Clumsy",
    description: "Must drop all items at the start of a hunt.",
    category: categories.nervous,
  },
  {
    display: "Dead or Alive",
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
    display: "Ebay Specialist",
    description: "Must collect all cell phones and laptops within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Dinner Time",
    description: "Must collect all plates, cups, and silverware within the building before leaving.",
    category: categories.collector,
  },
  {
    display: "Aspiring Artist",
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
  {
    display: "Chandler Bing",
    description: "Must always carry a lighted candle except to pickup and drop evidence items.",
    category: categories.nervous,
  },
  {
    display: "Sheet Inspector",
    description: "May only use the UV Flashlight or Glowsticks for a light source.",
    category: categories.nervous,
  },
  {
    display: "Leibovitz Mania",
    description: "Must get full book of 3-star photos or the mission is failed.",
    category: categories.obsessive,
  }
].map((x) => ({
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export default traits;
