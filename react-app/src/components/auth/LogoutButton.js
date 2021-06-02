import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {FiLogOut} from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (event) => {
    event.preventDefault();
    await dispatch(logout());
    history.push("/")
  };

  return (
    <>
      <a onClick={(event) => onLogout(event)}><FiLogOut className='import-id'/></a>
    </>
  );
};

export default LogoutButton;
