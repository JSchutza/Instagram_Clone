import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePostModal from "../CreatePost";
import SearchBar from "../SearchBar";
import { clearPosts, getUsrPosts, getFlwrPosts } from "../../store/post";
import styles from "./navbar.module.css";
import { demoLogin } from '../../store/session';

import profile_icon from "./profile_icon.svg";
import home_icon from "./home_icon.svg";
import create_post_icon from "./create_post_icon.svg";
import photo_gallery from "./photo-gallery.png";


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const demo = async () => {
   await dispatch(demoLogin());
  };

  const resetPosts = (bool) => {
    dispatch(clearPosts());
    if (bool) {
      dispatch(getFlwrPosts())
    } else {
      dispatch(getUsrPosts(sessionUser.id))
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className={styles.nav_div_search_bar}>
          <SearchBar />
        </div>
        <div className={styles.nav_buttons}>
          <div className={styles.nav_div_createpostbutton}>
            <CreatePostModal icon={create_post_icon} />
          </div>
          <div className={styles.nav_div_home_link}>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              onClick={() => resetPosts(true)}
            >
              <img alt="home-icon" src={home_icon} />
            </NavLink>
          </div>

          <div className={styles.nav_div_profile_link}>
            <NavLink
              to="/profile"
              exact={true}
              activeClassName="active"
              onClick={() => resetPosts(false)}
            >
              <img alt="profile-icon" src={profile_icon} />
            </NavLink>
          </div>

          <div className={styles.nav_div_logoutbutton}>
            <LogoutButton />
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div className={styles.log_sign}>
        <LoginFormModal />
        <SignupFormModal />
        <button className={styles.demoButton} onClick={() => demo()}>Demo-Login</button>
      </div>
    );
  }

  return (
    <div>
      <nav className={styles.nav}>
        <img alt="icon" src={photo_gallery} />
        {sessionLinks}
      </nav>
    </div>
  );
};

export default NavBar;
