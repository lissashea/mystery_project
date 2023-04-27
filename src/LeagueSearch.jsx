import React, { useState, useEffect } from "react";
import LeagueCard from "./LeagueCard";
import Select from "react-select";
import "./LeagueSearch.css";
import axios from "axios";

function LeagueSearch() {
  const [leagues, setLeagues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    value: "name",
    label: "League Name",
  });

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

  const handleSearchButtonClick = (event) => {
    event.preventDefault();
    // Do the search based on selectedOption and searchTerm
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/football"
        );
        setLeagues(response.data);
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
      <form onSubmit={handleSearchButtonClick}>
        <div className="search-container">
          <input
            type="text"
            placeholder={`Search by ${selectedOption.label}...`}
            value={searchTerm}
            onChange={handleSearch}
          />
          <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
          />
          <button className="searchbutton" type="submit">Search</button>
        </div>
      </form>
      {filteredLeagues.length > 0 ? (
        <div className="league-cards-container">
          {filteredLeagues.map((league) => (
            <LeagueCard key={league._id} league={league} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default LeagueSearch;
