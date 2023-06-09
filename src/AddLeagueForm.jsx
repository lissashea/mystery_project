import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import "./AddLeagueForm.css";

function AddLeagueForm({ onAdd, fetchAgain }) {
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
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);


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
      !formData.areaCode
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
        startDate: formData.startDate ? formData.startDate : new Date(),
        endDate: formData.endDate ? formData.endDate : new Date(),
      },
    };
  
    try {
      const response = await axios.post(
        "http://localhost:3000/football",
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
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Form submitted successfully!',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          setSubmitted(true);
          setShowForm(false); // close the form
          setMessage("")
          fetchAgain();
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting form. Please try again later.'
      });
    }
  };

  useEffect(() => {
    fetchAgain();
  }, [fetchAgain, submitted]);


  return (
    <div>
      <button className="addLeagueForm" onClick={handleAddLeagueClick}>
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
                value={formData.endDate ? formData.startDate.substring(0, 10) : ''}
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
                value={formData.endDate ? formData.endDate.substring(0, 10) : ''}
                onChange={handleChange}
                className="small-placeholder"
              />
            </label>
            <button type="submit" className="submitnewbutton">
              Add League
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default AddLeagueForm;