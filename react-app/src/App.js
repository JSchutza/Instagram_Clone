import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User/User";
import Feed from "./components/Feed"
import UserProfile from './components/UserProfile'

import { authenticate } from "./store/session";
import SearchPage from "./components/SearchPage";

import styles from "./app.module.css"


function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((store) => store.session.user)


  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
  }

  if (user == null) {
    return (
       <BrowserRouter>
       <div className={styles.home_wrappper}>
      <div className={styles.navbar_wrapper}>
      <NavBar />
      </div>
      <div className={styles.inner_wrapper}>
      <p className={styles.login_text}>Please login or sign-up to get started</p>
      <img className={styles.home_image} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flooxcie.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fbest-camera-for-instagram-guide.jpg&f=1&nofb=1'></img>
          </div>
        </div>
      </BrowserRouter>
    )
  }


  return (
    <BrowserRouter>
      <div className={styles.navbar_wrapper}>
      <NavBar />
      </div>

      <Switch>
        <ProtectedRoute path="/" exact={true}>
          <Feed />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:id">
          <UserProfile/>
        </ProtectedRoute>
        <ProtectedRoute path='/search'>
          <SearchPage/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
