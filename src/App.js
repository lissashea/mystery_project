import LeagueDashboard from "./LeagueDashboard.jsx";
import React, { useState, useEffect } from "react";

const App = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Fetch the league data from the API and set it as state
    const fetchLeagues = async () => {
      const response = await fetch("https://ancient-coast-33215.herokuapp.com/football");
      const data = await response.json();
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  return (
    <div className="app">
      <h1>Current Season Details</h1>
      <LeagueDashboard leagues={leagues} />
    </div>
  );
};

export default App;
