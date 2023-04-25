import React from "react";
import AddLeagueForm from "./AddLeagueForm.jsx";

const AddLeagueContainer = ({ onAdd }) => {
  const handleAddLeague = (newLeague) => {
    console.log("Adding new league:", newLeague);
    onAdd(newLeague);
  };

  return <AddLeagueForm onAdd={handleAddLeague} />;
};

export default AddLeagueContainer;
