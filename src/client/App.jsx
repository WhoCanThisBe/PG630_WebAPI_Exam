import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../shared/constant";
import { Login } from "./component/Login";
import { Home } from "./Home";
import { ErrorView } from "./component/ErrorView";
import SignUp from "./component/SignUp";
import { fetchJson } from "./lib/http";
import { Header } from "./component/Header";
import "./styles.css";

function Chat(props) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const username = props.username || "Guest";

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    setChatLog((prevLog) => [...prevLog, message]);
    setMessage("");
  }

  return (
    <aside className={"messagebrowser"}>
      <h1 className={"messagetitle"}>Message System</h1>
      <div className="chatBox">
        <p>Welcome {username}</p>
        <div className="messagelog">
          {chatLog.map((msg, index) => (
            <p key={index}>
              <strong>{username}</strong> {msg}
            </p>
          ))}
        </div>
      </div>
      <form className={"chatSubmit"} onSubmit={handleSubmitChatMessage}>
        <input
          type="text"
          autoFocus
          value={message}
          name={"chatText"}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type={"submit"}>Submit</button>
      </form>
    </aside>
  );
}

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
          <Home userId={user?.id}>
            <Chat />
          </Home>
        </Route>
        <Route path={NAV_PATH.LOGIN}>
          <Login setLoggedIn={() => setIsRegistered(true)} />
        </Route>
        <Route path={NAV_PATH.SIGNUP}>
          <SignUp setLoggedIn={() => setIsRegistered(true)} />
        </Route>
        <Route>
          <ErrorView />
        </Route>
      </Switch>
    </Router>
  );
}
