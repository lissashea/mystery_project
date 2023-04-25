import React, { useState } from "react";

const AddTeamForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://ancient-coast-33215.herokuapp.com/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          city,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onAdd(data);
        setName("");
        setCity("");
      }
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={handleCityChange} />
      </label>
      <button type="submit">Add Team</button>
    </form>
  );
};

export default AddTeamForm;
