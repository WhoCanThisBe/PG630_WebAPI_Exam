import React, { useState } from "react";
import { post } from "../lib/http";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../../shared/constant";
import StatusCode from "status-code-enum";
import { useSubmit } from "../lib/useSubmit";
import { useHistory } from "react-router";

export function Login({ setLoggedIn }) {
  //const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    () => post(USER_AUTH_ENDPOINT.LOGIN, { email, password }),
    () => {
      setLoggedIn();
      history.push(NAV_PATH.HOME);
    }
  );

  const errorMsg =
    error?.status === StatusCode.ClientErrorUnauthorized
      ? "Invalid username/password"
      : error?.toString();

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Email:
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        {error && <p>{errorMsg}</p>}

        {/*So no one can submit while one is submitting*/}
        <button
          className="button"
          type={"submit"}
          disabled={!password || submitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}
