import React, { useState } from "react";
import axios from "axios";

function AddLeagueForm({ onAdd }) {
  const [formData, setFormData] = useState({ name: "", country: "", founded: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://ancient-coast-33215.herokuapp.com/football", formData)
      .then((response) => {
        console.log(response);
        onAdd(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setFormData({ name: "", country: "", founded: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Add League</button>
    </form>
  );
}

export default AddLeagueForm;
