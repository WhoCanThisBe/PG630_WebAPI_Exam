const users = new Map();

function getUser(id) {
  return users.get(id);
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
};
