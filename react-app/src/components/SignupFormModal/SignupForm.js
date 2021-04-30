import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import styles from './signupform.module.css'


const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }



  return (
    <div className={styles.signup_wrapper}>
    <form onSubmit={onSignUp}>
        <div className={styles.signup_input_div}>
        <label>User Name</label>
          <br />
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
        <div className={styles.signup_input_div}>
        <label>Email</label>
          <br />
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
        <div className={styles.signup_input_div}>
        <label>Password</label>
          <br />
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
        <div className={styles.signup_input_div}>
        <label>Repeat Password</label>
          <br />
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
