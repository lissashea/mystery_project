import React, { useState } from "react";
import "./AddTeam.css";

const AddTeamForm = ({ leagueId, onAdd }) => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTeam = { name, venue, leagueId };
    onAdd(newTeam);
    setName("");
    setVenue("");
  };

  return (
    <div className="add-team-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
          required
        />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default AddTeamForm;
