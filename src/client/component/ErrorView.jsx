import { Link } from "react-router-dom";
import { NAV_PATH } from "../../shared/constant";
import React from "react";

export function ErrorView() {
  return (
    <div data-testid={"testview"}>
      <h1>Not Found 404</h1>
      <Link to={NAV_PATH.HOME}>
        <button>Return to HomePage</button>
      </Link>
    </div>
  );
}
