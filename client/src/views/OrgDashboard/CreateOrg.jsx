import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateOrg.less";
import { useNavigate } from "react-router-dom";

export default function CreateOrg() {
  const [orgName, setOrgName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="container nav-padding">
      <NavBar />
      <div id="create-header">Create Organization</div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Organization Name:
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
