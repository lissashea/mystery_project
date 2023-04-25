import LeagueDashboard from "./LeagueDashboard.jsx";
import React from "react";

const App = () => {
  return (
    <div className="app">
      <h1 style={{ color: 'black', textAlign: "center", marginBottom: "50px" }}>Current Season Details</h1>
      <LeagueDashboard />
    </div>
  );
};

export default App;
