import React, { useState } from "react";
import axios from "axios";
import "./LeagueSearch.css";

function LeagueCard({ league, setLeagues }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(league);

  const handleDelete = () => {
    axios
      .delete(`https://ancient-coast-33215.herokuapp.com/football/${league.id}`)
      .then(() => {
        setLeagues((prevLeagues) => prevLeagues.filter((prevLeague) => prevLeague.id !== league.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    axios
      .put(`https://ancient-coast-33215.herokuapp.com/football/${league.id}`, formData)
      .then(() => {
        setLeagues((prevLeagues) => {
          const index = prevLeagues.findIndex((prevLeague) => prevLeague.id === league.id);
          const updatedLeagues = [...prevLeagues];
          updatedLeagues[index] = formData;
          return updatedLeagues;
        });
        setEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setFormData(league);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="league-card">
      <h2>{league.name}</h2>
      {editing ? (
        <form>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </label>
          <label>
            Founded:
            <input type="number" name="founded" value={formData.founded} onChange={handleChange} />
          </label>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <>
          {league.area && league.area.flag &&
            <img src={league.area.flag} alt={`${league.area.name} flag`} />
          }
          <p>Country: {league.area ? league.area.name : 'N/A'}</p>
          <p>League Name: {league.name}</p>
          <p>Code: {league.code}</p>
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button" onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}

export default LeagueCard;
