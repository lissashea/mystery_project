import React, { useState } from "react";
import axios from "axios";
import "./LeagueSearch.css";

function LeagueCard({ league, setLeagues }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false); // new state variable

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
    if (!confirmed) {
      setMessage(
        <p className="confirmation-message">
          Are you sure you want to delete '{league.name}'?
        </p>
      );
      setConfirmed(true);
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:3000/football/${league._id}`
      );
      if (response.status === 200) {
        setLeagues((prevLeagues) =>
          prevLeagues.filter((prevLeague) => prevLeague._id !== league._id)
        );
        setMessage(`League '${league.name}' deleted successfully!`);
        setConfirmed(false); // reset fter the action is performed
        // add a delay and show anrt
        setTimeout(() => {
          alert(`League '${league.name}' deleted successfully!`);
        }, 3000);
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
    if (!confirmed) {
      setMessage(
        <p className="confirmation-message">
          Are you sure you want to edit '{league.name}'?
        </p>
      );
      setConfirmed(true);
      return;
    }
    try { // Remove the "flag" property from the area object
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
      console.log(league._id);

      const response = await axios.put(
        `http://localhost:3000/football/${league._id}`,
        updatedLeague,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        setConfirmed(false); // reset confirmed after the action is performed
        // add a delay and show an alert
        setTimeout(() => {
          alert(`League '${updatedLeague.name}' updated successfully!`);
        }, 1000);
        setEditing(false);
        window.location.reload();
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
          <div className="submit-cancel-wrapper">
            <button className="save-button" type="submit" onClick={handleSave}>
              {confirmed ? "Confirmed Save" : "Save"}{" "}
            </button>
            <button
              type="submit"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
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
            {confirmed ? "Confirmed Delete" : "Delete"}{" "}
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
