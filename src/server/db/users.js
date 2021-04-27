const users = new Map();

function getUser(id) {
  return users.get(id);
}

function getUserList() {
  if (users.size === 0) return null;

  const loggedInList = [];

  for (let user of users.values()) {
    const { id, firstName, loggedIn } = user;
    if (loggedIn) {
      loggedInList.push({ id, firstName });
    }
  }
  // console.log(loggedInList);
  return loggedInList;
}

function logOutUser(id) {
  const user = getUser(id);
  user.loggedIn = false;
  users.set(id, user);
}

function logInUser(id) {
  const user = getUser(id);
  user.loggedIn = true;
  users.set(id, user);
}

function verifyUser(id, password) {
  const user = getUser(id);
  if (!user) return false;
  return user.password === password;
}

function createUser(user) {
  if (getUser(user.email)) return false;
  const newUser = {
    id: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
    loggedIn: true,
  };

  users.set(newUser.id, newUser);
  return true;
}

function resetAllUsers() {
  users.clear();
}

module.exports = {
  getUser,
  verifyUser,
  createUser,
  resetAllUsers,
  getUserList,
  logOutUser,
  logInUser,
};
