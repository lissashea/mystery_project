import React, { useState } from "react";

const AddTeamForm = ({ onAddTeam }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://ancient-coast-33215.herokuapp.com/football",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, code, area }),
        }
      );
      const data = await response.json();
      onAddTeam(data);
      setName("");
      setCode("");
      setArea("");
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Code:
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </label>
      <label>
        Area:
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </label>
      <button type="submit">Add Team</button>
    </form>
  );
};

export default AddTeamForm;
