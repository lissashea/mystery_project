import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./LeagueDashboard.css";
import AddTeamForm from "./AddTeam.jsx";

const LeagueCard = ({ league, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://ancient-coast-33215.herokuapp.com/football/${league._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(league._id);
      }
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  };

  return (
    <div className="league-card">
      <button className="delete-btn" onClick={handleDelete}>X</button>
      {league.area?.flag && (
        <img src={league.area.flag} alt={`${league.area?.name} flag`} />
      )}
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

const LeagueDashboard = () => {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "name", label: "Name" },
    { value: "code", label: "Code" },
    { value: "area", label: "Area" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch(
          "https://ancient-coast-33215.herokuapp.com/football"
        );
        const data = await response.json();
        setLeagues(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeagues();
  }, []);

  const handleDeleteLeague = (id) => {
    setLeagues((prevLeagues) => prevLeagues.filter((league) => league._id !== id));
  };

  const handleAddTeam = (newTeam) => {
    setLeagues((prevLeagues) =>
      prevLeagues.map((league) => {
        if (league._id === newTeam.leagueId) {
          return { ...league, teams: [...league.teams, newTeam] };
        } else {
          return league;
        }
      })
    );
  };

  const filteredLeagues = leagues.filter((league) => {
    if (!selectedOption) {
      return false;
    }

    switch (selectedOption.value) {
      case "name":
        return league.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "code":
        return league.code
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "area":
        return league.area?.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return false;
    }
  });

  return (
    <div className="league-dashboard">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a league..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select options={options} onChange={handleChange} />
      </div>
      <div className="league-cards-container">
        {filteredLeagues.map((league) => (
          <LeagueCard key={league._id} league={league} onDelete={handleDeleteLeague} />
          ))}
      </div>
    </div>
  );
};

export default LeagueDashboard;
