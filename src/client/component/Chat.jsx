import React, { useState } from "react";

export function Chat({ user, onSendMessage, chatLog, ...props }) {
  const [message, setMessage] = useState("");

  function handleSubmitChatMessage(e) {
    e.preventDefault();
    const name = `${user.firstName} ${user.lastName}`;
    onSendMessage({ name, message });
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
        <button type={"submit"}>Submit</button>
      </form>
    </aside>
  );
}
