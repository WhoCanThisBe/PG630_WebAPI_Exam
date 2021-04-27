import { useHistory } from "react-router";
import { useSubmit } from "../lib/useSubmit";
import { post } from "../lib/http";
import { NAV_PATH, USER_AUTH_ENDPOINT } from "../../shared/constant";
import { NavLink } from "react-router-dom";
import React from "react";

export function Header({ user, onLogout, ...props }) {
  const history = useHistory();

  const { handleSubmit: handleLogout } = useSubmit(
    () => post(USER_AUTH_ENDPOINT.LOGOUT),
    () => {
      onLogout();
      history.push(NAV_PATH.HOME);
    }
  );

  // then can use "!isLoggedIn" in an if-block
  // and don't have to worry about the value being inverted, which would happen if the value was truthy/falsy...)
  const isLoggedIn = !!user;
  const message = isLoggedIn
    ? `welcome ${user.firstName} ${user.lastName} (${user.id})`
    : "You are not logged in";

  let buttons = (
    <>
      <NavLink className="header-button" to={NAV_PATH.LOGIN}>
        LogIn
      </NavLink>
      <NavLink className="header-button" to={NAV_PATH.SIGNUP}>
        SignUp
      </NavLink>
    </>
  );

  // Only show the Logout-button if the user is logged-in
  if (isLoggedIn) {
    buttons = (
      <>
        <NavLink className="header-button" to={NAV_PATH.SIGNUP}>
          Register
        </NavLink>

        <button onClick={handleLogout}>LogOut</button>
      </>
    );
  }

  return (
    <header>
      <p className="header-text">{message}</p>
      <div className="action-buttons">{buttons}</div>
    </header>
  );
}
