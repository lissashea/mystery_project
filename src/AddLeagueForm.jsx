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

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.code ||
      !formData.areaName ||
      !formData.areaCode ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setMessage("Please fill out all fields");
      return;
    }

    const newLeague = {
      name: formData.name,
      code: formData.code,
      area: {
        name: formData.areaName,
        code: formData.areaCode,
        flag: formData.areaFlag || null,
      },
      currentSeason: {
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
    };

    try {
      const response = await fetch(
        "https://ancient-coast-33215.herokuapp.com/football",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLeague),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add league");
      }
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
      setMessage("League added successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          League Name:
          <input
            type="text"
            name="name"
            placeholder="league Name"
            value={formData.name}
            onChange={handleChange}
            className="small-placeholder"
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            name="code"
            placeholder="league abbreviation"
            value={formData.code}
            onChange={handleChange}
            className="small-placeholder"
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="areaName"
            placeholder="country"
            value={formData.areaName}
            onChange={handleChange}
            className="small-placeholder"
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            name="areaCode"
            placeholder="league code"
            value={formData.areaCode}
            onChange={handleChange}
            className="small-placeholder"
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
            className="small-placeholder"
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
            className="small-placeholder"
          />
        </label>
        <button className="submitnewbutton" type="submit">
          Add League
        </button>
      </form>
      <p>{message}</p>
      {submitted && <p>Form submitted successfully!</p>}
    </div>
  )};  

export default AddLeagueForm;
