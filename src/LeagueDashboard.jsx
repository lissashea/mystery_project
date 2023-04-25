import React from "react";
import './LeagueDashboard.css';


//The dashboard consists of a collection of LeagueCard components, each displaying information for a single league, such as the league's name, code, area, start date, and end date. The LeagueDashboard component will be responsible for rendering these LeagueCard components, and possibly for filtering or sorting the data as well.

const LeagueCard = ({ league }) => {
  return (
    <div className="league-card">
      <img src={league.area?.flag} alt={`${league.area?.name} flag`} />
      <h2>{league.name}</h2>
      <p>
        <strong>Code:</strong> {league.code}
      </p>
      <p>
        <strong>Area:</strong> {league.area?.name}
      </p>
      <p>
        <strong>Start Date:</strong> {league.currentSeason?.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {league.currentSeason?.endDate}
      </p>
    </div>
  );
};



const LeagueDashboard = ({ leagues }) => {
  return (
    <div className="league-dashboard">
      {leagues.map((league) => (
        <LeagueCard key={league._id} league={league} />
      ))}
    </div>
  );
};

export default LeagueDashboard;
