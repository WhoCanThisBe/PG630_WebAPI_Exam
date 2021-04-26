import React, { useState } from "react";

export function Chat({ user, onSendMessage, chatLog, ...props }) {
  const [message, setMessage] = useState("");

  const username = props.username || "Guest";

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
    <aside className={"messagebrowser"}>
      <h1 className={"messagetitle"}>Message System</h1>
      <div className="chatBox">
        <p>Welcome {username?.firstName}</p>
        <div className="messagelog">
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
