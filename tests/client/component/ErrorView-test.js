import * as ReactDOM from "react-dom";
import * as React from "react";
import { ErrorView } from "../../../src/client/component/ErrorView";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

it("shows ErrorView", () => {
  render(
    <MemoryRouter>
      <ErrorView />
    </MemoryRouter>
  );

  expect(screen.getByTestId(/testview/i)).toContainHTML(
    `<div data-testid="testview"><h1>Not Found 404</h1><a href="/"><button>Return to HomePage</button></a></div>`
  );
});
