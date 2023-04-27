import React, { useState } from "react";
import axios from "axios";

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
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddLeagueClick = () => {
    setShowForm(!showForm);
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
      const response = await axios.post(
        "https://ancient-coast-33215.herokuapp.com/football",
        newLeague
      );
      onAdd(response.data);
      setFormData({
        name: "",
        code: "",
        areaName: "",
        areaCode: "",
        areaFlag: "",
        startDate: "",
        endDate: "",
      });
      window.alert("Form submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      window.alert("Error submitting form. Please try again later.");
    }
  };
  return (
    <div>
      <button className="hideform" onClick={handleAddLeagueClick}>
        {showForm ? "Close Form" : "Add League"}
      </button>
      {showForm && (
        <div className="form-container">
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
              League Code:
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
              Country Code:
              <input
                type="text"
                name="areaCode"
                placeholder="location code"
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
            <button type="submit" className="submitnewbutton">
              Add League
            </button>
          </form>
          {message && <p>{message}</p>}
          {submitted && (
            <div className="success-message">
              <p>Form submitted successfully!</p>
              <button className="submit-form-ok" onClick={() => window.location.reload()}>OK</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddLeagueForm;
