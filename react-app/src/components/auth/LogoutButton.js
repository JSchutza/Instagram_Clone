import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";





const LogoutButton = () => {
  const dispatch = useDispatch();


  const onLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };



  return (
    <>
      <a onClick={(event) => onLogout(event)}> Logout </a>
    </>
  )

};



export default LogoutButton;
