import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = ({ id }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-pencil-square text-primary" aria-hidden="true"></i>
        <p className="inline-block ml-1">Edit Profile</p>
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i>
        <p className="inline-block ml-1">Add Experience</p>
      </Link>
      <Link to="/add-education" className="btn btn-light ">
        <i className="fas fa-graduation-cap text-primary"></i>
        <p className="inline-block ml-1 ">Add Education</p>
      </Link>
    </div>
  );
};
