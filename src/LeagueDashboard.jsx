import React, { useState, useEffect } from "react";
import "./LeagueDashboard.css";
import AddTeamForm from "./AddTeam.jsx";
import Select from "react-select";

const LeagueCard = ({ league, onDelete, onDeleteTeam, onAdd }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDelete(league._id);
      }
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/teams/${teamId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        onDeleteTeam(teamId);
      }
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleAddTeam = async (newTeam) => {
    try {
      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/teams`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeam),
        }
      );
      if (response.ok) {
        const data = await response.json();
        onAdd(data);
      }
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  return (
    <div className="league-card">
      <button className="delete-btn" onClick={handleDelete}>
        X
      </button>
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
      <AddTeamForm leagueId={league._id} onAdd={handleAddTeam} />
      <div className="team-list">
        {league.teams?.map((team) => (
          <div key={team._id} className="team">
            <button
              className="delete-btn"
              onClick={() => handleDeleteTeam(team._id)}
            >
              X
            </button>
            <p>{team.name}</p>
            <p>{team.venue}</p>
          </div>
        ))}
      </div>
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
    setLeagues((prevLeagues) =>
      prevLeagues.filter((league) => league._id !== id)
    );
  };

  const handleAddTeam = async (newTeam) => {
    try {
      const response = await fetch(
        "https://ancient-coast-33215.herokuapp.com/football/teams",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTeam),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setLeagues((prevLeagues) =>
          prevLeagues.map((league) => {
            if (league._id === newTeam.leagueId) {
              return { ...league, teams: [...league.teams, data] };
            } else {
              return league;
            }
          })
        );
      }
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  const filteredLeagues = leagues.filter((league) => {
    if (!selectedOption) {
      return false;
    }

    switch (selectedOption.value) {
      case "name":
        return (
          league.name &&
          league.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "code":
        return (
          league.code &&
          league.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case "area":
        return (
          league.area &&
          league.area.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
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
          <LeagueCard
            key={league._id}
            league={league}
            onDelete={handleDeleteLeague}
            onAdd={handleAddTeam}
          />
        ))}
      </div>
    </div>
  );
};

export default LeagueDashboard;
