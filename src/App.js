import { useSelector } from "react-redux";
import React from "react";

import { selectThemeName, selectViews } from "./appSlice";
import ChallengeRandomizer from "./features/randomizers/challenges/ChallengeRandomizer";
import Evidence from "./features/evidence/Evidence";
import GhostName from "./features/ghostname/GhostName";
import Ghosts from "./features/ghosts/Ghosts";
import Header from "./features/header/Header";
import JobRandomizer from "./features/randomizers/jobrandomizer/JobRandomizer";
import PhasmoRPG from "./features/phasmorpg/PhasmoRPG";
import PhotoCalculator from "./features/photocalculator/PhotoCalculator";
import Theme from "./features/theme/Theme";
import Alerts from './common/Alerts';

import "./App.css";

function App() {
  const views = useSelector(selectViews);
  const themeName = useSelector(selectThemeName);
  return (
    <Theme themeName={themeName}>
      <div className="App">
        <header className="App-header">
          <Header />
          {views.ghostName && <GhostName />}
        </header>
        <main className="App-main">
          {views.evidence && <Evidence />}
          {views.ghosts && <Ghosts />}
          {views.phasmorpg && <PhasmoRPG />}
          {views.challenges && <ChallengeRandomizer />}
          {views.jobs && <JobRandomizer />}
          {views.photocalculator && <PhotoCalculator />}
          <Alerts />
        </main>
      </div>
    </Theme>
  );
}

export default App;
