import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSubmit } from "./lib/useSubmit";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../shared/constant";
import { post } from "./lib/http";

const SignUp = ({ setLoggedIn, ...props }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, onConfirmChange] = useState("");

  const history = useHistory();

  const { handleSubmit, submitting, error } = useSubmit(
    //this is for reason of the lectures I had when making the quiz part. so this time, having a own fetch to work around
    () =>
      post(USER_AUTH_ENDPOINT.SIGNUP, { firstName, lastName, email, password }),
    () => {
      // Trigger fetching of userInfo in App
      setLoggedIn();
      history.push(NAV_PATH.HOME);
    }
  );

  const isTheSame = password === confirm;

  let confirmMsg = isTheSame ? "ok" : "not the same";

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <label>
          Firstname
          <br />
          <input
            type="text"
            value={firstName}
            placeholder={"Given Name"}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Lastname:
          <br />
          <input
            type="text"
            value={lastName}
            placeholder={"Surname"}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email:
          <br />
          <input
            type="email"
            value={email}
            placeholder={"Email"}
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
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Confirm:
          <br />
          <input
            type="type password"
            value={confirm}
            placeholder={"retype password"}
            onChange={(e) => onConfirmChange(e.target.value)}
            required
          />
          <div>{confirm.length > 0 && confirmMsg}</div>
          <br />
        </label>

        {error && <p>{error.toString()}</p>}

        <button
          className="button"
          type={"submit"}
          disabled={!isTheSame || submitting}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
