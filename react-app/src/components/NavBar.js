import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignupFormModal from './SignupFormModal';
import CreatePostModal from './CreatePost';
import SearchBar from './SearchBar';
import { clearPosts } from '../store/post'




const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()

  const resetPosts = () => {
    // event.preventDefault();
    dispatch(clearPosts())

  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <LogoutButton />
        <CreatePostModal/>
        <NavLink to="/profile" exact={true} activeClassName="active" onClick={() => resetPosts()}>
          Profile
        </NavLink>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal/>
        <SignupFormModal/>
      </>
    );
  }



  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active" onClick={() => resetPosts()}>
            Home
          </NavLink>
          <SearchBar/>
        </li>
        <li>
          {sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
