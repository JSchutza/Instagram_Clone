import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Profile from '../ProfilePage/Profile.js';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile-container'>
      <Profile/>

    </div>
    
  );
}
export default User;
