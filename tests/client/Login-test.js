import React from "react";
import { post } from "../../src/client/lib/http";
import { Login } from "../../src/client/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/client/lib/http");

post.mockImplementationOnce(() => {
  throw new Error("Invalid username/password");
});

test("test fail to log in", async () => {
  render(<Login />);

  // Typing into the input-fields
  userEvent.type(screen.getByText(/email/i), "test@mail.com");
  userEvent.type(screen.getByText(/password/i), "testpassword");

  const loginBtn = screen.getByRole("button", { name: /login/i });

  userEvent.click(loginBtn);

  expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
});
