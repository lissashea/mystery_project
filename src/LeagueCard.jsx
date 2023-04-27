import React, { useState } from "react";
import axios from "axios";
import "./LeagueSearch.css";

function LeagueCard({ league, setLeagues }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: league?.name,
    code: league?.code,
    area: {
      name: league?.area?.name,
      code: league?.area?.code,
    },
    currentSeason: {
      startDate: league?.currentSeason?.startDate,
      endDate: league?.currentSeason?.endDate,
    },
  });

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`
      );
      if (response.status === 200) {
        setLeagues((prevLeagues) =>
          prevLeagues.filter((prevLeague) => prevLeague._id !== league._id)
        );
        setMessage(`League '${league.name}' deleted successfully!`);
      }
    } catch (error) {
      console.error("Error deleting league:", error);
    }
    window.location.reload();
  };

  const handleEdit = (id) => {
    setEditing(true);
    setFormData({
      ...league,
      id: id,
    });
  };

  const handleSave = async () => {
    try {
      // Remove the "flag" property from the area object
      const updatedLeague = {
        name: formData.name,
        code: formData.code,
        area: {
          name: formData.area.name,
          code: formData.area.code,
        },
        currentSeason: {
          startDate: formData.currentSeason.startDate,
          endDate: formData.currentSeason.endDate,
        },
      };
  
      const response = await axios.put(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`,
        updatedLeague,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(response);
  
      if (response.status === 200) {
        setMessage(`League '${updatedLeague.name}' updated successfully`);
      } else {
        throw new Error("PUT request failed");
      }
    } catch (error) {
      console.error("Error updating league:", error);
      setMessage("Failed to update league");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: league.name,
      code: league.code,
      area: {
        name: league.area.name,
        code: league.area.code,
      },
      currentSeason: {
        startDate: league.currentSeason?.startDate,
        endDate: league.currentSeason?.endDate,
      },
    });
    setEditing(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="league-card">
      <h2>{league.name}</h2>
      {editing ? (
        <form>
          <label>
            League Name:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="area.name"
              value={formData.area?.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            League Code:
            <input
              type="text"
              name="code"
              value={formData.code || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Season Start:
            <input
              type="text"
              name="currentSeason.startDate"
              value={formData.currentSeason?.startDate || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Season End:
            <input
              type="text"
              name="currentSeason.endDate"
              value={formData.currentSeason?.endDate || ""}
              onChange={handleChange}
            />
          </label>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          {league.area && league.area.flag && (
            <img src={league.area.flag} alt={`${league.area.name} flag`} />
          )}
          <p>Country: {league.area ? league.area.name : "N/A"}</p>
          <p>League Name: {league.name}</p>
          <p>Code: {league.code}</p>
          <p>Season Start: {league.currentSeason?.startDate}</p>
          <p>Season End: {league.currentSeason?.endDate}</p>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={() => handleEdit(league._id)}>
            Edit
          </button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default LeagueCard;
