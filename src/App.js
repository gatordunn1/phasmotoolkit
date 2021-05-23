import { useSelector } from "react-redux";
import React from "react";

import { Evidence } from "./features/evidence/Evidence";
import { Ghosts } from "./features/ghosts/Ghosts";
import { selectViews } from "./appSlice";
import GhostName from "./features/ghostname/GhostName";
import Header from "./features/header/Header";
import Theme from "./features/theme/Theme";

import "./App.css";

function App() {
  const views = useSelector(selectViews);
  return (
    <Theme>
      <div className="App">
        <header className="App-header">
          <Header />
          {views.ghostName && <GhostName />}
        </header>
        <main className="App-main">
          {views.evidence && <Evidence />}
          {views.ghosts && <Ghosts />}
        </main>
      </div>
    </Theme>
  );
}

export default App;
