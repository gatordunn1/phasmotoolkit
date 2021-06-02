import { nanoid } from "nanoid";
import categories from "./categories";

const traits = [
  {
    display: "Chatterbox",
    description: "Must speak into the mic during hunts until you reach a hiding spot.",
    category: "reckless",
  },
  {
    display: "Manic Skeptic",
    description: "If found, must immediately ask the Ouija board five questions.",
    category: "reckless",
    duration: 3,
  },
  {
    display: "Moonwalker",
    description: "Must move backwards at all times.",
    category: "silly",
    duration: 1,
  },
  {
    display: "Krusty Locomotion",
    description: "Must always crouch and move side-to-side only (crab walk).",
    category: "silly",
  },
  {
    display: "Microbladder",
    description: "Upon entering any bathroom, must flush all flushable toilets.",
    category: "obsessive",
  },
  {
    display: "Clumsy",
    description: "Must drop all items at the start of every hunt.",
    category: "nervous",
  },
  {
    display: "Dead or Alive",
    description: "Must spin in place for two full circles at the start of a hunt.",
    category: "nervous",
  },
  {
    display: "Creeper",
    description: "Must collect all photos within the building before leaving.",
    category: "collector",
  },
  {
    display: "Krampus",
    description:
      "Must collect all toys, dolls, balls, blocks, etc within the building before leaving.",
    category: "collector",
  },
  {
    display: "Ebay Specialist",
    description: "Must collect all cell phones and laptops within the building before leaving.",
    category: "collector",
  },
  {
    display: "Dinner Time",
    description:
      "Must collect all plates, cups, and silverware within the building before leaving.",
    category: "collector",
  },
  {
    display: "Aspiring Artist",
    description: "Must collect all spraypaint cans within the building before leaving.",
    category: "collector",
  },
  {
    display: "Nyctalopian",
    description: "Must turn on the lights in every room they enter and keep them on.",
    category: "nervous",
  },
  {
    display: "Photophobian",
    description: "Must turn off the lights in every room they enter and keep them off.",
    category: "nervous",
  },
  {
    display: "Chandler Bing",
    description: "Must always carry a lighted candle except to pick up and drop evidence items.",
    category: "nervous",
  },
  {
    display: "Sheet Inspector",
    description: "May only use the UV Flashlight or Glowsticks for a light source.",
    category: "nervous",
  },
  {
    display: "Leibovitz Mania",
    description: "Must get full book of 3-star photos or the mission is failed.",
    category: "obsessive",
  },
  {
    display: "Downed Powerlines",
    description: "Unable to turn on the building power.",
    category: "temporary",
  },
].map((x) => ({
  removalCost: categories[x.category].removalCost,
  duration: categories[x.category].duration || -1,
  remaining: categories[x.category].duration || -1,
  ...x,
  id: nanoid(),
  enabled: true,
  used: false,
}));

export default traits;
