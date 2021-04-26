const users = new Map();

function getUser(id) {
  return users.get(id);
}
function getUserList() {
  const loggedInList = [];
  users.forEach((v, k) => {
    loggedInList.push(k);
  });
  return loggedInList;
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
};
