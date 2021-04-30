import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePostModal from "../CreatePost";
import SearchBar from "../SearchBar";
import { clearPosts } from "../../store/post";
import styles from "./navbar.module.css";

import profile_icon from "./profile_icon.svg";
import home_icon from "./home_icon.svg";
import create_post_icon from "./create_post_icon.svg";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const resetPosts = () => {
    dispatch(clearPosts());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className={styles.nav_div_home_link}>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              onClick={() => resetPosts()}
            >
              <img src={home_icon} />
            </NavLink>
          </li>

          <div className={styles.nav_div_profile_link}>
            <li>
              <NavLink
                to="/profile"
                exact={true}
                activeClassName="active"
                onClick={() => resetPosts()}
              >
                <img src={profile_icon} />
              </NavLink>
            </li>
          </div>

          <div className={styles.nav_div_logoutbutton}>
            <li>
              <LogoutButton />
            </li>
          </div>

          <div className={styles.nav_div_createpostbutton}>
            <li>
              <CreatePostModal icon={create_post_icon} />
            </li>
          </div>
        </div>

        <div className={styles.nav_div_search_bar}>
          <li>
            <SearchBar />
          </li>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>

        <li>
          <SignupFormModal />
        </li>
      </>
    );
  }

  return (
    <div className={styles.nav_div}>
      <nav>
        <ul>{sessionLinks}</ul>
      </nav>
    </div>
  );
};

export default NavBar;
