import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "../../src/client/SignUp";
import userEvent from "@testing-library/user-event";

//TODO: Move this into a shared file later (e.g: user-test-utils.js)

function generateUser() {
  return {
    firstName: "testFirstname",
    lastName: "testLastname",
    email: "test@mail.com",
    password: "testpassword",
  };
}

test("Should render signup inputs and button", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/given/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/sur/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/retype/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});

test("type in user info and not the same password on both fields, should show not the same ", () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );

  const user = generateUser();

  // Signup with a user using the input fields
  const firstname = screen.getByPlaceholderText(/given/i);
  const lastname = screen.getByPlaceholderText(/surname/i);
  const email = screen.getByPlaceholderText(/email/i);
  const password = screen.getByPlaceholderText("Password");
  const retype = screen.getByPlaceholderText(/retype/i);

  // Try to repeat the process with
  userEvent.type(firstname, user.firstName);
  userEvent.type(lastname, user.lastName);
  userEvent.type(email, user.email);
  userEvent.type(password, user.password);
  userEvent.type(retype, "not the same");

  expect(screen.getByDisplayValue("testFirstname")).toBeInTheDocument();
  expect(screen.getByDisplayValue("testLastname")).toBeInTheDocument();
  expect(screen.getByDisplayValue("test@mail.com")).toBeInTheDocument();
  expect(screen.getByText("not the same")).toBeInTheDocument();
});
