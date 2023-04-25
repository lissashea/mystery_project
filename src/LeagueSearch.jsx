import React, { useState, useEffect } from "react";
import LeagueCard from "./LeagueCard";
import Select from "react-select";
import "./LeagueSearch.css";

function LeagueSearch() {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "name", label: "League Name" },
    { value: "code", label: "League Code" },
    { value: "area", label: "League Country" },
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
        if (!response.ok) {
          throw new Error("Failed to fetch leagues");
        }
        const data = await response.json();
        setLeagues(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeagues();
  }, []);

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
          league.area.name &&
          league.area.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return false;
    }
  });

  return (
    <div className="league-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a league..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          options={options}
          onChange={handleChange}
          defaultValue={options[0]}
        />
      </div>
      {filteredLeagues.length > 0 && (
        <div className="league-cards-container">
          {filteredLeagues.map((league) => (
            <LeagueCard key={league._id} league={league} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LeagueSearch;
