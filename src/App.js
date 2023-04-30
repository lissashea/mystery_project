import React, { useState } from "react";
import LeagueSearch from "./LeagueSearch.jsx";

function App() {
  const [leagues, setLeagues] = useState([]);

  return (
    <div className="app">
      <h1>Football Leagues</h1>
      <LeagueSearch leagues={leagues} setLeagues={setLeagues} />
    </div>
  );
}

export default App;
