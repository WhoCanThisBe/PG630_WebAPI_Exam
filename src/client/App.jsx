import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../shared/constant";
import { Login } from "./component/Login";
import { Home } from "./Home";
import { ErrorView } from "./component/ErrorView";
import SignUp from "./component/SignUp";
import { fetchJson } from "./lib/http";
import { Header } from "./component/Header";
import "./styles.css";
import { Chat } from "./Chat";

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

  const [clientSocket, setClientSocket] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const connected = useRef(false);

  // useEffect for handling WebSocket connections
  // Adaption of the following: https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/blob/reference/12/src/client/ChatPage.jsx
  useEffect(() => {
    function connect() {
      console.log("WS -> Connecting");
      // host => localhost:3000
      const ws = new WebSocket(`ws://${window.location.host}`);
      setClientSocket(ws);

      ws.onopen = (e) => {
        console.log("WS -> opened", e.target);
        connected.current = true;
      };

      ws.onmessage = (e) => {
        console.log("WS -> Message received", e.data);
        const { name, id, message } = JSON.parse(e.data);

        setChatLog((prevLog) => [...prevLog, { name, id, message }]);
      };

      ws.onerror = (e) => {
        console.error(e);
      };

      ws.onclose = (e) => {
        console.log("WS -> Close", e);

        if (connected.current) {
          setTimeout(connect, 1_000);
        } else {
          setTimeout(connect, 10_000);
        }
        connected.current = false;
      };
    }
    connect();
  }, []);

  const handleSendMessage = (json) => {
    clientSocket.send(JSON.stringify(json));
  };

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
          <Home isUserLoggedIn={isRegistered}>
            <Chat
              user={user}
              chatLog={chatLog}
              onSendMessage={handleSendMessage}
            />
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
