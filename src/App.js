import React, { useState } from "react";
import AddLeagueForm from "./AddLeagueForm.jsx";
import LeagueSearch from "./LeagueSearch.jsx";

function App() {
  const [leagues, setLeagues] = useState([]);

  const handleAdd = (newLeague) => {
    setLeagues([...leagues, newLeague]);
  };

  return (
    <div className="app">
      <h1>Football Leagues</h1>
      <AddLeagueForm onAdd={handleAdd} />
      <LeagueSearch leagues={leagues} setLeagues={setLeagues} />
    </div>
  );
}

export default App;
