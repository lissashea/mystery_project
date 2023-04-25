import React, { useState } from "react";

function AddLeagueForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    areaName: "",
    areaCode: "",
    areaFlag: null,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newLeague = {
      name: formData.name,
      code: formData.code,
      area: {
        name: formData.areaName,
        code: formData.areaCode,
        flag: formData.areaFlag || null
      },
      currentSeason: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    };
  
    try {
      const response = await fetch("https://ancient-coast-33215.herokuapp.com/football", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLeague)
      });
  
      const data = await response.json();
  
      onAdd(data);
  
      setFormData({
        name: "",
        code: "",
        areaName: "",
        areaCode: "",
        areaFlag: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        League Name:
        <input
          type="text"
          name="name"
          placeholder="League Name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Code:
        <input
          type="text"
          name="code"
          placeholder="three or two digit league code"
          value={formData.code}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type="text"
          name="areaName"
          placeholder="Country"
          value={formData.areaName}
          onChange={handleChange}
        />
      </label>
      <label>
        Code:
        <input
          type="text"
          name="areaCode"
          placeholder="League Code"
          value={formData.areaCode}
          onChange={handleChange}
        />
      </label>
      <label>
        Area Flag:
        <input
          type="text"
          name="areaFlag"
          placeholder="flag image url"
          value={formData.areaFlag}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Season Start Date:
        <input
          type="text"
          name="startDate"
          placeholder="2022-08-10"
          value={formData.startDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Current Season End Date:
        <input
          type="text"
          name="endDate"
          placeholder="2022-08-10"
          value={formData.endDate}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add League</button>
    </form>
  );
}

export default AddLeagueForm;
