import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User/User";
import Feed from "./components/Feed"
import CreatePost from "./components/CreatePost";

import { authenticate } from "./store/session";




function App() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/" exact={true}>
          <h1>Feed</h1>
          <Feed />
        </ProtectedRoute>

        <ProtectedRoute path="/profile" exact={true} >
          <User />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
