import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (event) => {
    event.preventDefault();
    await dispatch(logout());
  };

  return (
    <>
      <a onClick={(event) => onLogout(event)}> Logout </a>
    </>
  );
};

export default LogoutButton;
