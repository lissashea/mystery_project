import React, { useState, useEffect } from "react";
import LeagueSearch from "./LeagueSearch.jsx";
import AddLeagueForm from "./AddLeagueForm.jsx";
import axios from "axios";

function App() {
  const [leagues, setLeagues] = useState([]);

  const fetchLeagues = async () => {
    try {
      const response = await axios.get("http://localhost:3000/football");
      setLeagues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = (newLeague) => {
    setLeagues([...leagues, newLeague]);
  };

  useEffect(() => {
    fetchLeagues();
  }, []);

  return (
    <div className="app">
      <h1>Football Leagues</h1>
      <AddLeagueForm onAdd={handleAdd} fetchAgain={fetchLeagues} />
      <LeagueSearch leagues={leagues} setLeagues={setLeagues} />
    </div>
  );
}

export default App;
