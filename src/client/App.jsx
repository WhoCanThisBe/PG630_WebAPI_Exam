import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../shared/constant";
import { Chat } from "./component/Chat";
import { ErrorView } from "./component/ErrorView";
import { Header } from "./component/Header";
import { Login } from "./Login";
import SignUp from "./SignUp";
import { Home } from "./Home";
import { fetchJson } from "./lib/http";

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

  useEffect(() => {
    fetchUserInfo();
  }, [isRegistered]);

  const [clientSocket, setClientSocket] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const connected = useRef(false);

  //https://stackoverflow.com/questions/51316727/how-do-i-send-a-message-to-a-specific-user-in-ws-library

  function connectWS() {
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

      // Link to info on close-code: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#status_codes
      const wasClosedNormally = e.code === 1_000;

      if (connected.current && !wasClosedNormally) {
        setTimeout(connectWS, 1_000);
      } else {
        setTimeout(connectWS, 10_000);
      }
      connected.current = false;
    };
  }

  // useEffect for handling WebSocket connections
  // Adaption of the following: https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures/blob/reference/12/src/client/ChatPage.jsx
  useEffect(() => {
    if (!user) return;
    connectWS();
  }, [user?.id]);

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
          clientSocket.close(1000, "User logout");
        }}
      />

      <Switch>
        <Route exact path={NAV_PATH.HOME}>
          <Home isUserLoggedIn={user?.id}>
            <Chat
              user={user}
              chatLog={chatLog}
              socket={clientSocket}
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
