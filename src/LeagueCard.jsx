import React, { useState } from "react";
import axios from "axios";
import "./LeagueSearch.css";
import Swal from "sweetalert2";
import "./LeagueCard.css";

function LeagueCard({ league, fetchAgain }) {
  const [editing, setEditing] = useState(false);
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
    try {
      const alertt = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      Swal.fire({
        title: `Are you sure to delete ${league.name} of ${league.area.name}`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            `http://localhost:3000/football/${league._id}`
          );
          if (response.status === 200) {
            alertt
              .fire("Deleted!", `${league.name} has been deleted!`, "success")
              .then((res) => {
                fetchAgain();
              });
          }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          alertt.fire("Cancelled", `${league.name} is safe :)`, "error");
        }
      });
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  };

  const handleEdit = (id) => {
    setEditing(true);
    setFormData({
      ...league,
      id: id,
    });
  };

  const handleSave = async () => {
    try {
      // Remove the "flag" property from the area object
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

      const response = await axios.put(
        `http://localhost:3000/football/${league._id}`,
        updatedLeague,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success.",
        }).then((res) => {
          setEditing(false);
          fetchAgain();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        throw new Error("PUT request failed");
      }
    } catch (error) {
      console.error("Error updating league:", error);
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
          <p>
            Season Start:{" "}
            {new Date(league.currentSeason.startDate).toLocaleDateString()}
          </p>
          <p>
            Season End:{" "}
            {new Date(league.currentSeason.endDate).toLocaleDateString()}
          </p>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={() => handleEdit(league._id)}>
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default LeagueCard;
