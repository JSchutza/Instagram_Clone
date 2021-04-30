import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';
import CreatePostModal from './CreatePost';
import SearchBar from './SearchBar';
import { clearPosts } from '../store/post'
import styles from './navbar.module.css'



const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const resetPosts = () => {
    dispatch(clearPosts())
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className={styles.nav_div_profile_link}>
      <li>
        <NavLink to="/profile" exact={true} activeClassName="active" onClick={() => resetPosts()}>
          Profile
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
          <CreatePostModal/>
        </li>
      </div>


      </>
    );
  } else {
    sessionLinks = (
      <>
      <li>
        <LoginFormModal/>
      </li>

      <li>
        <SignupFormModal/>
      </li>

      </>
    );
  }



  return (
    <div className={styles.nav_div}>
    <nav>
      <ul>

        <div className={styles.nav_div_home_link}>
          <li>
            <NavLink to="/" exact={true} activeClassName="active" onClick={() => resetPosts()}>
              Home
            </NavLink>
          </li>
        </div>

        {sessionLinks}

        <div className={styles.nav_div_search_bar}>
          <li>
            <SearchBar/>
          </li>
        </div>
      </ul>
    </nav>
    </div>
  );
}

export default NavBar;
