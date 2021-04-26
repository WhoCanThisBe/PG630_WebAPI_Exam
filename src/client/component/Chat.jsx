import React, { useEffect, useState } from "react";
import { fetchJson } from "../lib/http";
import { USER_AUTH_ENDPOINT } from "../../shared/constant";

export function Chat({ user, onSendMessage, chatLog, ...props }) {
  const [message, setMessage] = useState("");
  const [loginList, setLoginList] = useState([]);
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    fetchLoggedInlist();
  }, []);

  const fetchLoggedInlist = async () => {
    try {
      const payload = await fetchJson(USER_AUTH_ENDPOINT.LOGGEDIN);
      console.log(payload);
      setLoginList(payload);
    } catch (err) {}
  };

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    const name = `${user.firstName} ${user.lastName}`;

    onSendMessage({ name, message, receiver });
    setMessage("");
  }

  function renderMessage(msg) {
    const { id, name, message } = msg;
    return (
      <p key={id}>
        <strong>{name}</strong> {message}
      </p>
    );
  }

  return (
    <aside
      className={"chatWindow"}
      style={{
        backgroundColor: "orange",
        border: "2px solid purple",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h1
        className={"title chatBoxTitle"}
        style={{ backgroundColor: "goldenrod" }}
      >
        The amazing chat
      </h1>
      <div className="chatBox">
        <p>
          Welcome {user?.firstName} {user?.lastName}
        </p>
        <div className="chatLog" style={{ backgroundColor: "lightblue" }}>
          {chatLog.map((msg) => renderMessage(msg))}
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
        <select
          className={"userList"}
          onChange={(event) => {
            setReceiver(event.target.value);
          }}
        >
          {loginList.map((val, key) => (
            <option key={key} value={val}>
              {val}
            </option>
          ))}
        </select>
        <button type={"submit"}>Submit</button>
      </form>
    </aside>
  );
}
