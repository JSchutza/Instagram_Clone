import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from "../ProfilePage/Profile.js";
import "./User.css";

function User() {
  useEffect(() => {}, []);

  return (
    <div className="profile-container">
      <Profile />
    </div>
  );
}

export default User;
