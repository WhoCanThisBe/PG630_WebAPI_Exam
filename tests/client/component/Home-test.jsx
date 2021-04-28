import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Home } from "../../../src/client/Home";

const user = {
  id: "testID",
};

test("Test should render to login when not logged inn", async () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText("please log in")).toBeInTheDocument();
  expect(screen.getByText(/go to/i)).toBeInTheDocument();
});

test("Test when logged inn", async () => {
  render(
    <MemoryRouter>
      <Home isUserLoggedIn={user.id} />
    </MemoryRouter>
  );
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  // expect(screen.getByText("please log in")).toBeInTheDocument();
  // expect(screen.getByText(/go to/i)).toBeInTheDocument();
  screen.debug();
});
