const express = require("express");
const router = express.Router();
const passport = require("passport");
const { StatusCode } = require("status-code-enum");
const userDatabase = require("../db/users");

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(StatusCode.SuccessNoContent).send();
});

router.post("/signup", (req, res) => {
  const { userId, password } = req.body;

  const authorizedUser = userDatabase.createUser(userId, password);

  if (!authorizedUser) {
    return res.sendStatus(StatusCode.ClientErrorUnauthorized);
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) res.sendStatus(StatusCode.ClientErrorBadRequest);
      else res.sendStatus(StatusCode.SuccessCreated);
    });
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(StatusCode.SuccessNoContent);
});

router.get("/user", (req, res) => {
  if (!req.user) return res.sendStatus(StatusCode.ClientErrorUnauthorized);

  const { password, ...user } = req.user;

  res.status(StatusCode.SuccessOK).json(user);
});

module.exports = router;
