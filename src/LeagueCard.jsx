import React, { useState } from "react";
import "./LeagueSearch.css";

function LeagueCard({ league, setLeagues }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(league);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
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

  const handleEdit = () => {
    setEditing(true);
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://ancient-coast-33215.herokuapp.com/football/${league.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );
  //     if (response.ok) {
  //       setLeagues((prevLeagues) => {
  //         const index = prevLeagues.findIndex(
  //           (prevLeague) => prevLeague.id === league.id
  //         );
  //         const updatedLeagues = [...prevLeagues];
  //         updatedLeagues[index] = formData;
  //         return updatedLeagues;
  //       });
  //       setEditing(false);
  //     }
  //   } catch (error) {
  //     console.error("Error updating league:", error);
  //   }
  // };

  // suggested 
  // const index = prevLeagues.findIndex(
  //   (prevLeague) => prevLeague._id === league._id
  // );

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setLeagues((prevLeagues) => {
          const index = prevLeagues.findIndex(
            (prevLeague) => prevLeague.id === league.id
          );
          const updatedLeagues = [...prevLeagues];
          updatedLeagues[index] = formData;
          return updatedLeagues;
        });
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating league:", error);
    }
  };

  const handleCancel = () => {
    setFormData(league);
    setEditing(false);
  };

  const handleChange = (e) => {
    console.log(typeof e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  
  return (
    <div className="league-card">
      <h2>{league.name}</h2>
      {editing ? (
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.area.name}
              onChange={handleChange}
            />
          </label>
          <label>
            League Abbreviation:
            <input
              type="text"
              name="league-abbreviation"
              value={formData.area.code}
              onChange={handleChange}
            />
          </label>
          <label>
            Start-Date:
            <input
              type="string"
              name="start-date"
              value={formData.currentSeason?.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            End-Date:
            <input
              type="string"
              name="start-date"
              value={formData.currentSeason?.startDate}
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
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default LeagueCard;
