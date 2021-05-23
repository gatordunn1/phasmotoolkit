import Divider from "@material-ui/core/Divider";
import React from "react";

import { Evidence } from "./features/evidence/Evidence";
import { Ghosts } from "./features/ghosts/Ghosts";
import GhostName from "./features/ghostname/GhostName";
import Header from "./features/header/Header";
import Theme from "./features/theme/Theme";

import "./App.css";

function App() {
  return (
    <Theme>
      <div className="App">
        <header className="App-header">
          <Header />
          <GhostName />
        </header>
        <main className="App-main">
          <Evidence />
          <Divider light />
          <Ghosts />
        </main>
      </div>
    </Theme>
  );
}

export default App;
