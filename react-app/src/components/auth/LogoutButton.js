import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {FiLogOut} from 'react-icons/fi'

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (event) => {
    event.preventDefault();
    await dispatch(logout());
  };

  return (
    <>
      <a onClick={(event) => onLogout(event)}><FiLogOut className='import-id'/></a>
    </>
  );
};

export default LogoutButton;
