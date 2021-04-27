const express = require("express");
const router = express.Router();
const passport = require("passport");
const { StatusCode } = require("status-code-enum");
const userDatabase = require("../db/users");
const { logInUser } = require("../db/users");
const { logOutUser } = require("../db/users");
const { getUserList, logoutUsers } = require("../db/users");

router.post("/login", passport.authenticate("local"), (req, res) => {
  req.session.userId = { ...req.user };
  req.session.userId.password = undefined;
  logInUser(req.user.id);
  res.status(StatusCode.SuccessNoContent).send();
});

router.post("/signup", (req, res) => {
  const user = req.body;

  const authorizedUser = userDatabase.createUser(user);

  if (!authorizedUser) {
    return res.sendStatus(StatusCode.ClientErrorUnauthorized);
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.sendStatus(StatusCode.ClientErrorBadRequest);
      else res.sendStatus(StatusCode.SuccessCreated);
    });
  });
  req.session.userId = { ...req.user };
  req.session.userId.password = undefined;
});

router.post("/logout", (req, res) => {
  console.log("Request: ");
  console.log(req);
  console.log("Body: ");
  console.log(req.user);
  logOutUser(req.user.id);
  req.logout();
  req.session.destroy();
  res.sendStatus(StatusCode.SuccessNoContent);
});

router.get("/user", (req, res) => {
  if (!req.user) return res.sendStatus(StatusCode.ClientErrorUnauthorized);

  const { password, ...user } = req.user;

  res.status(StatusCode.SuccessOK).json(user);
});

router.get("/userlist", (req, res) => {
  const loggedInList = getUserList();
  res.status(StatusCode.SuccessOK).json(loggedInList);
});

module.exports = router;
