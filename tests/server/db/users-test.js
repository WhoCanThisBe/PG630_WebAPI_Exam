const {
  getUser,
  createUser,
  resetAllUsers,
  verifyUser,
  getUserList,
  logOutUser,
  logInUser,
} = require("../../../src/server/db/users");

const user = {
  id: "test@mail.com",
  firstName: "testFirstname",
  lastName: "testLastname",
  email: "test@mail.com",
  loggedIn: true,
  password: "testpassword",
};

beforeEach(() => {
  resetAllUsers();
});

// frontend takes checks for that all is added is required,
// of course it should be some checks there as well
test("adding a user", () => {
  //should throw undefined when there is no user in the map
  expect(getUser(user.id)).toEqual(undefined);
  //creating user
  expect(createUser(user)).toBe(true);
  expect(getUser(user.id)).toEqual(user);
});

test("testing of adding and testing verifyUser for not creating same user twice", () => {
  // fails when the user is not created
  expect(verifyUser(user.id, user.password)).toBe(false);

  expect(createUser(user, user.password)).toBe(true);
  expect(verifyUser(user.id, user.password)).toBe(true);
});

test("cant persist two of the same user", () => {
  expect(createUser(user, user.password)).toBe(true);
  expect(createUser(user, user.password)).toBe(false);
});

test("return userList of of created", () => {
  expect(getUserList()).toBe(null);

  createUser(user);
  const userList = getUserList();
  expect(userList[0].id).toBe("test@mail.com");

  //should not return password
  expect(userList[0].password).toBeUndefined();
});

test("Logged out user should be shown as logged out, and logged in when user logs in again", () => {
  createUser(user);
  expect(getUser(user.id).loggedIn).toBe(true);

  logOutUser(user.id);
  expect(getUser(user.id).loggedIn).toBe(false);

  logInUser(user.id);
  expect(getUser(user.id).loggedIn).toBe(true);
});
