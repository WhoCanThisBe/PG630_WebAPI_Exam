import { Link } from "react-router-dom";
import { NAV_PATH } from "../shared/constant";
import React from "react";

export function Home({ isUserLoggedIn, ...props }) {
  return (
    <div className={"app"}>
      <h2>Welcome To the Chat app </h2>
      {isUserLoggedIn ? (
        props.children
      ) : (
        <>
          <p>please log in</p>
          <div className={"action"}>
            <Link to={NAV_PATH.LOGIN} className={"play"}>
              Go to login
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
