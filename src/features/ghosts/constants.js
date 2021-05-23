export const ghostNames = [
  "Banshee",
  "Demon",
  "Hantu",
  "Jinn",
  "Mare",
  "Oni",
  "Phantom",
  "Poltergeist",
  "Revenant",
  "Shade",
  "Spirit",
  "Wraith",
  "Yokai",
  "Yurei",
];

export const ghosts = [
  {
    name: "Banshee",
    description:
      "A Banshee is a natural hunter and will attack anything. It has been known to stalk its prey one at a time until making its kill.",
    evidence: ["emflevel5", "fingerprints", "freezingtemperatures"],
    secondaryEvidence: ["May hunt above 65% Average Sanity"],
    strengths: "A Banshee will only target one person at a time.",
    weaknesses: "Banshees fear the Crucifix and will be less aggressive when near one.",
  },
  {
    name: "Demon",
    evidence: ["ghostwriting", "freezingtemperatures", "spiritbox"],
    description:
      "A Demon is one of the worst Ghosts you can encounter. It has been known to attack without a reason.",
    secondaryEvidence: [
      "May hunt up to 65% Average Sanity.",
      "Successful Ouija board questions do not lower sanity.",
    ],
    strengths: "Demons will attack more often than any other Ghost.",
    weaknesses:
      "Asking a Demon successful questions on the Ouija Board won't lower the user's sanity.",
  },
  {
    name: "Hantu",
    evidence: ["fingerprints", "ghostorbs", "ghostwriting"],
    description:
      "A Hantu is a rare ghost that can be found in hot climates. They are known to attack often during cold weather.",
    secondaryEvidence: [],
    strengths: "Lower temperatures can cause the Hantu to move at faster speeds.",
    weaknesses: "A Hantu will move slower in warmer areas.",
  },
  {
    name: "Jinn",
    evidence: ["emflevel5", "ghostorbs", "spiritbox"],
    description:
      "A Jinn is a territorial ghost that will attack when threatened. It has also been known to be able to travel at significant speed.",
    secondaryEvidence: ["Moves faster with breaker on.", "Moves normal speed with breaker off."],
    strengths: " A Jinn will travel at a faster speed if its victim is far away.",
    weaknesses:
      "Turning off the locations power source will prevent the Jinn from using its ability.",
  },
  {
    name: "Mare",
    evidence: ["freezingtemperatures", "ghostorbs", "spiritbox"],
    description: "A Mare is the source of all nightmares, making it most powerful in the dark.",
    secondaryEvidence: [
      "May hunt up to 60% Average Sanity in the dark.",
      "Can not hunt until 40% Average Sanity in the light.",
    ],
    strengths: "A Mare will have an increased chance to attack in the dark.",
    weaknesses: "Turning the lights on around the Mare will lower its chance to attack.",
  },
  {
    name: "Oni",
    evidence: ["emflevel5", "ghostwriting", "spiritbox"],
    description:
      "Oni's are a cousin to the Demon and possess extreme strength. There have been rumours that they become more active around their prey.",
    secondaryEvidence: ["May throw objects at high speed and great distances."],
    strengths:
      "Oni's are more active when people are nearby and have been seen moving objects at great speed.",
    weaknesses: "Being more active make the Oni easier to find and identify",
  },
  {
    name: "Phantom",
    evidence: ["emflevel5", "freezingtemperatures", "ghostorbs"],
    description:
      "A Phantom is a ghost that can possess the living, most commonly summoned by a Ouija Board. It also induces fear into those around it.",
    secondaryEvidence: [
      "Will disappear when photo is taken outside of a hunt but continue manifesting.",
      "Blinks approximately twice as slow as other ghosts during hunts.",
    ],
    strengths: "Looking at a Phantom will considerably drop your sanity.",
    weaknesses: "Taking a photo of the Phantom will make it temporarily disappear.",
  },
  {
    name: "Poltergeist",
    evidence: ["fingerprints", "ghostorbs", "spiritbox"],
    description:
      "One of the most famous Ghosts, a Poltergeist, also known as a noisy ghost can manipulate objects around it to spread fear into its victims.",
    secondaryEvidence: ["May throw multiple objects at once."],
    strengths: "A Poltergeist can throw huge amounts of objects at once.",
    weaknesses: "A Poltergeist is almost ineffective in an empty room.",
  },
  {
    name: "Revenant",
    evidence: ["emflevel5", "fingerprints", "ghostwriting"],
    description:
      "A Revenant is a slow but violent ghost that will attack indiscriminately. It has been rumoured to travel at a significantly high speed when hunting.",
    secondaryEvidence: [
      "Moves very quickly while it has line of sight on player during hunt.",
      "Moves very slowly during hunt when not targetting a player.",
    ],

    strengths: "A Revenant will travel at a significantly faster speed when hunting a victim.",
    weaknesses: "Hiding from the Revenant will cause it to move very slowly.",
  },
  {
    name: "Shade",
    evidence: ["emflevel5", "ghostorbs", "ghostwriting"],
    description:
      "A Shade is known to be a Shy Ghost. There is evidence that a Shade will stop all paranormal activity if there are multiple people nearby.",
    secondaryEvidence: [],
    strengths: "Being shy means the Ghost will be harder to find.",
    weaknesses: "The Ghost will not enter hunting mode if there is multiple people nearby.",
  },
  {
    name: "Spirit",
    evidence: ["fingerprints", "ghostwriting", "spiritbox"],
    description:
      "A Spirit is the most common Ghost you will come across however it is still very powerful and dangerous. They are usually discovered at one of their hunting grounds after an unexplained death.",
    secondaryEvidence: [
      "Smudging prevents a hunt for 180 seconds (3 minutes) instead of 90 seconds like normal ghosts.",
    ],
    strengths: "Nothing.",
    weaknesses:
      "Using Smudge Sticks on a spirit will stop it attacking for a long period of time.",
  },
  {
    name: "Wraith",
    evidence: ["fingerprints", "freezingtemperatures", "spiritbox"],
    description:
      "A wraith is one of the most dangerous ghosts you will find. It is also the only known Ghost that has the ability of flight and has sometimes been known to travel through walls.",
    secondaryEvidence: [
      "After stepping in salt, may make footstep sounds but will never leave glowing footprints.",
    ],
    strengths: "Wraiths almost never touch the ground meaning it can't be tracked by footsteps.",
    weaknesses: "Wraiths have a toxic reaction to Salt.",
  },
  {
    name: "Yokai",
    evidence: ["ghostorbs", "ghostwriting", "spiritbox"],
    description:
      "A Yokai is a common type of ghost that is attracted to human voices. They can usually be found haunting family homes.",
    secondaryEvidence: [],
    strengths: "Talking near a Yokai will anger it and increase it's chance of attacking.",
    weaknesses: "When hunting a Yokai can only hear voices close to it.",
  },
  {
    name: "Yurei",
    evidence: ["freezingtemperatures", "ghostorbs", "ghostwriting"],
    description:
      "A Yurei is a Ghost that has returned to the physical world, usually for the purpose of revenge or hatred.",
    secondaryEvidence: [],
    strengths: "Yurei's have been known to have a stronger effect on people sanity.",
    weaknesses:
      "Smudging the Yurei's room will cause it to not wander around the location for a long time.",
  },
];

const allGhosts = ghosts.map((ghost) => ({
  ...ghost,
  included: true,
}));

export const initialState = {
  list: allGhosts,
  selected: null,
  visible: true,
};
