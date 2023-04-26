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

  const handleSave = async () => {
    try {
      // Only allow the "plan" property to be updated
      const updatedLeague = {
        plan: formData.plan,
      };

      // Check that the new "plan" value is valid
      const validPlans = ["TIER_FOUR", "TIER_THREE", "TIER_TWO", "TIER_ONE"];
      if (!validPlans.includes(formData.plan)) {
        throw new Error("Invalid 'plan' value");
      }

      const response = await fetch(
        `https://ancient-coast-33215.herokuapp.com/football/${league._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLeague),
        }
      );
      console.log(response); // add this line to log the response object
      if (response.ok) {
        setMessage(`Plan '${formData.plan}' added to league '${league.name}'`);
      } else {
        throw new Error("PUT request failed");
      }
      if (response.ok) {
        setMessage(`Plan '${formData.plan}' added to league '${league.name}'`);
      } else {
        throw new Error("PUT request failed");
      }
    } catch (error) {
      console.error("Error updating league:", error);
      setMessage("Failed to update league");
    }
  };

  const handleCancel = () => {
    setFormData(league);
    setEditing(false);
  };

  const handleChange = (e) => {
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
            Plan:
            <select name="plan" value={formData.plan} onChange={handleChange}>
              <option value="TIER_FOUR">Tier 4</option>
              <option value="TIER_THREE">Tier 3</option>
              <option value="TIER_TWO">Tier 2</option>
              <option value="TIER_ONE">Tier 1</option>
            </select>
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
