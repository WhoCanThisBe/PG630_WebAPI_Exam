import React, { useEffect, useState } from "react";
import { fetchJson } from "../lib/http";
import { USER_AUTH_ENDPOINT } from "../../shared/constant";

export function Chat({ user, onSendMessage, chatLog, ...props }) {
  const [message, setMessage] = useState("");
  const [loginList, setLoginList] = useState([]);
  const [receiver, setReceiver] = useState("all");
  useEffect(() => {
    fetchLoggedInlist();
  }, []);

  const fetchLoggedInlist = async () => {
    try {
      const payload = await fetchJson(USER_AUTH_ENDPOINT.LOGGEDIN);
      console.log("payload");
      console.log(payload);
      setLoginList(payload);
    } catch (err) {}
  };

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    const name = `${user.firstName} ${user.lastName}`;
    console.log(receiver);
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
    <aside className={"chatWindow"} style={{}}>
      <h1 className={"title chatBoxTitle"}>The amazing chat</h1>
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
        <label style={{ backgroundColor: "white" }}> choose receiver </label>
        <select
          className={"userList"}
          onChange={(event) => {
            setReceiver(event.target.value);
          }}
        >
          <option key="all" value={"all"}>
            send to all
          </option>
          {loginList.map((val, i) => (
            <option key={i} value={val.id}>
              {val.firstName}
            </option>
          ))}
        </select>
        <button type={"submit"}>Submit</button>
      </form>
    </aside>
  );
}
