import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../../../src/client/component/Header";

const user = {
  firstName: "testFirstname",
  lastName: "testLastname",
  email: "test@mail.com",
  password: "testpassword",
};

test("test not showing when there is user logged inn", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  expect(screen.getByText(/you are not logged in/i)).toBeInTheDocument();
  expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  expect(screen.getByText(/log in/i)).toBeInTheDocument();
});

test("test when logged inn", () => {
  render(
    <MemoryRouter>
      <Header user={user} />
    </MemoryRouter>
  );

  expect(screen.getByText(/welcome testfirstname/i)).toBeInTheDocument();
  expect(screen.getByText(/register new user/i)).toBeInTheDocument();
  expect(screen.getByText(/log out/i)).toBeInTheDocument();
});
