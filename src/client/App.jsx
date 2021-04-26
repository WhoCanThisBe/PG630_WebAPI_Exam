import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../shared/constant";
import { Login } from "./component/Login";
import { Home } from "./Home";
import { ErrorView } from "./component/ErrorView";
import SignUp from "./component/SignUp";
import { fetchJson } from "./lib/http";
import { Header } from "./component/Header";

export function App() {
  const [user, setUser] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchUserInfo = async () => {
    try {
      const payload = await fetchJson(USER_AUTH_ENDPOINT.USER_INFO);
      setUser(payload);
    } catch (err) {
      // Nothing special that App must do here, so only logging out the error
      console.error(`[${App.name}] - ${err.message}`);
    }
  };

  // TODO: Remove/change this useEffect after setting up WebSockets
  useEffect(() => {
    fetchUserInfo();
  }, [isRegistered]);

  return (
    <Router>
      <Header
        user={user}
        onLogout={() => {
          setIsRegistered(false);
          setUser(null);
        }}
      />

      <Switch>
        <Route exact path={NAV_PATH.HOME}>
          <Home />
        </Route>
        <Route path={NAV_PATH.LOGIN}>
          <Login setLoggedIn={() => setIsRegistered(true)} />
        </Route>
        <Route path={NAV_PATH.SIGNUP}>
          <SignUp setLoggedIn={() => setIsRegistered(true)}/>
        </Route>
        <Route>
          <ErrorView />
        </Route>
      </Switch>
    </Router>
  );
}
